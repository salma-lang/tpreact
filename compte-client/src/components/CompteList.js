import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
    const [comptes, setComptes] = useState([]);
    const [editCompte, setEditCompte] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchComptes = () => {
        axios.get(`${API_BASE_URL}/banque/comptes`)
            .then(response => setComptes(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchComptes();
    }, []);

    const handleEdit = (compte) => {
        setEditCompte(compte);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/banque/comptes/${editCompte.id}`, editCompte);
            setShowEditModal(false);
            fetchComptes();
            alert('Compte modifié avec succès!');
        } catch (error) {
            console.error('Error updating compte:', error);
            alert('Erreur lors de la modification');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte?')) {
            try {
                await axios.delete(`${API_BASE_URL}/banque/comptes/${id}`);
                fetchComptes();
                alert('Compte supprimé avec succès!');
            } catch (error) {
                console.error('Error deleting compte:', error);
                alert('Erreur lors de la suppression');
            }
        }
    };

    const handleEditInputChange = (e) => {
        setEditCompte({
            ...editCompte,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h3>Liste des Comptes</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Solde</th>
                        <th>Date de Création</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comptes.map(compte => (
                        <tr key={compte.id}>
                            <td>{compte.id}</td>
                            <td>{compte.solde}</td>
                            <td>{compte.dateCreation}</td>
                            <td>{compte.type}</td>
                            <td>
                                <button 
                                    style={{
                                        backgroundColor: '#A9A9A9',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        marginRight: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleEdit(compte)}
                                >
                                    Modifier
                                </button>
                                <button 
                                    style={{
                                        backgroundColor: '#D3D3D3',
                                        color: '#4a4a4a',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleDelete(compte.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditModal && (
                <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier le compte</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label>Solde:</label>
                                        <input
                                            type="number"
                                            name="solde"
                                            value={editCompte.solde}
                                            onChange={handleEditInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Date de Création:</label>
                                        <input
                                            type="date"
                                            name="dateCreation"
                                            value={editCompte.dateCreation}
                                            onChange={handleEditInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Type:</label>
                                        <select
                                            name="type"
                                            value={editCompte.type}
                                            onChange={handleEditInputChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="COURANT">COURANT</option>
                                            <option value="EPARGNE">EPARGNE</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Annuler</button>
                                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompteList;