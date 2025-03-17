import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Visualisation() {
    // Exemple de données (à remplacer plus tard avec les vraies données)
    const casConfirmes = [
        { date: 'Jan', cas: 4000 },
        { date: 'Fev', cas: 3000 },
        { date: 'Mar', cas: 2000 },
        { date: 'Avr', cas: 2780 },
    ];

    const guerisons = [
        { mois: 'Jan', gueris: 2400 },
        { mois: 'Fev', gueris: 1398 },
        { mois: 'Mar', gueris: 9800 },
        { mois: 'Avr', gueris: 3908 },
    ];

    const hospitalisations = [
        { name: 'Soins intensifs', value: 400 },
        { name: 'Hospitalisation normale', value: 300 },
        { name: 'Soins légers', value: 300 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 p-6 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Carte des cas confirmés */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Cas Confirmés</h3>
                    <div className="w-full h-48">
                        <LineChart width={300} height={180} data={casConfirmes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="cas" stroke="#8884d8" />
                        </LineChart>
                    </div>
                    <p className="text-gray-600">Evolution des cas confirmés au fil du temps</p>
                </div>

                {/* Carte des guérisons */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Guérisons</h3>
                    <div className="w-full h-48">
                        <BarChart width={300} height={180} data={guerisons}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mois" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="gueris" fill="#82ca9d" />
                        </BarChart>
                    </div>
                    <p className="text-gray-600">Taux de guérison et tendances</p>
                </div>

                {/* Carte des hospitalisations */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Hospitalisations</h3>
                    <div className="w-full h-48">
                        <PieChart width={300} height={180}>
                            <Pie
                                data={hospitalisations}
                                cx={150}
                                cy={90}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {hospitalisations.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                    <p className="text-gray-600">Suivi des hospitalisations</p>
                </div>

                {/* Carte de la vaccination */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Vaccination</h3>
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                        {/* Graphique à implémenter */}
                    </div>
                    <p className="text-gray-600">Progression de la vaccination</p>
                </div>

                {/* Carte des tests */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Tests</h3>
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                        {/* Graphique à implémenter */}
                    </div>
                    <p className="text-gray-600">Nombre de tests effectués</p>
                </div>

                {/* Carte des variants */}
                <div className="card hover:shadow-xl p-6 bg-white rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600">Variants</h3>
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                        {/* Graphique à implémenter */}
                    </div>
                    <p className="text-gray-600">Distribution des variants</p>
                </div>
            </div>
        </div>
    );
}
