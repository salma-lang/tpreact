import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
    const [compte, setCompte] = useState({
        solde: '',
        dateCreation: '',
        type: 'COURANT'
    });

    const handleInputChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formattedData = {
            solde: parseFloat(compte.solde),
            dateCreation: new Date(compte.dateCreation).toISOString().split('T')[0],
            type: compte.type
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/banque/comptes`, 
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data) {
                alert('Compte ajouté avec succès!');
                setCompte({
                    solde: '',
                    dateCreation: '',
                    type: 'COURANT'
                });
                window.location.reload();
            }
        } catch (error) {
            console.error('Error details:', error.response?.data);
            alert('Erreur lors de l\'ajout du compte. Vérifiez les données.');
        }
    };

    return (
        <div>
            <h3 className="mb-4">Ajouter un Compte</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Solde :</label>
                    <input
                        type="number"
                        step="0.01"
                        name="solde"
                        value={compte.solde}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        min="0"
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Date de Création :</label>
                    <input
                        type="date"
                        name="dateCreation"
                        value={compte.dateCreation}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Type :</label>
                    <select
                        name="type"
                        value={compte.type}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    >
                        <option value="COURANT">COURANT</option>
                        <option value="EPARGNE">EPARGNE</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Ajouter
                </button>
            </form>
        </div>
    );
}

export default CompteForm;