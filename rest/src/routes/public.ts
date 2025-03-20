import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Helper function to transform bigints to regular numbers
function transformBigInts(obj: any): any {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "bigint") {
            obj[key] = Number(obj[key]);
        }
        if (typeof obj[key] === "object") {
            obj[key] = transformBigInts(obj[key]);
        }
    });

    return obj;
}

// Public COVID data routes (unprotected)
router.get(
    "/covid/public/latest",
    async (_req: Request, res: Response): Promise<void> => {
        try {
            const latestData = await prisma.covidData.findMany({
                take: 10,
                orderBy: {
                    date: "desc",
                },
            });
            res.json(transformBigInts(latestData));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
);

// Public MPOX summary (unprotected)
router.get(
    "/mpox/public/summary",
    async (_req: Request, res: Response): Promise<void> => {
        try {
            const summary = await prisma.$queryRaw`
      SELECT country, MAX(total_cases) as latest_cases
      FROM "mpox_data"
      GROUP BY country
      ORDER BY latest_cases DESC
      LIMIT 5
    `;
            res.json(transformBigInts(summary));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
);

// Public endpoint to get COVID data for a specific country
router.get(
    "/covid/public/country/:country",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { country } = req.params;

            const data = await prisma.covidData.findMany({
                where: {
                    country,
                },
                orderBy: {
                    date: "desc",
                },
                take: 30, // Last 30 days
            });

            res.json(transformBigInts(data));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
);

// Public endpoint to get global COVID totals
router.get(
    "/covid/public/totals",
    async (_req: Request, res: Response): Promise<void> => {
        try {
            const latestDate = await prisma.covidData.findFirst({
                orderBy: {
                    date: "desc",
                },
                select: {
                    date: true,
                },
            });

            if (!latestDate) {
                res.json({
                    total_cases: 0,
                    total_deaths: 0,
                    total_recovered: 0,
                });
                return;
            }

            const totals: any = await prisma.$queryRaw`
      SELECT 
        SUM(total_cases) as total_cases, 
        SUM(total_deaths) as total_deaths, 
        SUM(total_recovered) as total_recovered
      FROM "covid_data"
      WHERE date = ${latestDate.date}
    `;

            res.json(transformBigInts(totals[0]));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
);

export default router;
