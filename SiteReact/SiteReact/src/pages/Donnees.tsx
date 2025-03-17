import { useState } from "react";

export default function Donnees() {
    const [searchTerm, setSearchTerm] = useState("");

    const [data] = useState<string[]>([]);


    const filteredData = data.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 p-6 pt-20">
            <div className="card hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 bg-white shadow-lg">
                <h2 className="text-4xl font-bold mb-4 text-center text-teal-600">Données COVID-19</h2>
                <p className="text-lg text-center mb-4 text-gray-700">Voici une liste des données disponibles pour l'analyse de la pandémie :</p>


                <input
                    type="text"
                    placeholder="Rechercher des données..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <ul className="list-disc pl-6 mt-4 space-y-3">
                    {filteredData.length === 0 ? (
                        <li className="text-xl text-gray-500 text-center">Aucune donnée disponible pour le moment.</li>
                    ) : (
                        filteredData.map((item, index) => (
                            <li
                                key={index}
                                className="text-xl text-gray-700 hover:text-teal-600 transition-colors duration-200">
                                <span className="bg-teal-200 text-teal-800 px-2 py-1 rounded-lg mr-2">
                                    {index + 1}
                                </span>
                                {item}
                            </li>
                        ))
                    )}
                </ul>


                <p className="mt-4 text-sm text-gray-600 text-center">
                    Ces données seront utilisées pour générer des graphiques et des analyses détaillées sur l'impact de la pandémie de COVID-19.
                </p>
            </div>
        </div>
    );
}
