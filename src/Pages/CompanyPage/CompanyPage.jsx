import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CompanyPage.css";
import fallback from "../../images/fallback.png"; // Add a fallback image if the logo is not available

function CompanyPage() {
    const { id } = useParams(); // Get the company ID from the URL
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/company/${id}?api_key=1de54ccbfea3c2dcfeffd0338867c3b5`
                );

                if (response.ok) {
                    const data = await response.json();
                    setCompany(data);
                } else {
                    throw new Error(`API returned status ${response.status}`);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading company details...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!company) {
        return <div className="error">No company details found.</div>;
    }

    return (
        <>
        <h1 style={{color: "#ffd700", fontSize: "2.5rem"}}>Production Company Card</h1>
        <div className="company-page-container">
            <div className="company-header">
                <img
                    src={
                        company.logo_path
                            ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                            : fallback
                    }
                    alt={company.name}
                    className="company-logo"
                />
                <h1>{company.name}</h1>
            </div>
            <div className="company-details">
                <p>
                    <strong>Description:</strong>{" "}
                    {company.description || "No description available."}
                </p>
                <p>
                    <strong>Headquarters:</strong>{" "}
                    {company.headquarters || "N/A"}
                </p>
                <p>
                    <strong>Origin Country:</strong>{" "}
                    {company.origin_country || "N/A"}
                </p>
                {company.parent_company && (
                    <p>
                        <strong>Parent Company:</strong>{" "}
                        {company.parent_company.name || "N/A"}
                    </p>
                )}
                {company.homepage && (
                    <p>
                        <strong>Homepage:</strong>{" "}
                        <a
                            href={company.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Homepage
                        </a>
                    </p>
                )}
            </div>
        </div>
        </>
    );
}

export default CompanyPage;
