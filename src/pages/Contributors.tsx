import React, { useEffect, useState } from 'react';

interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

// Function to fetch the contributors from GitHub API
const fetchContributors = async (): Promise<Contributor[]> => {
    const OWNER = "iTusharyadav";
    const REPO = "proofolio";
    const URL = `https://api.github.com/repos/${OWNER}/${REPO}/contributors`;

    const response = await fetch(URL);
    if (response.ok) {
        const contributors = await response.json();
        return contributors;
    } else {
        throw new Error('Error fetching contributors');
    }
};

const Contributors: React.FC = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getContributors = async () => {
            try {
                const data = await fetchContributors();
                setContributors(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getContributors();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading contributors...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Proofolio Contributors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {contributors.map((contributor) => (
                    <div
                        key={contributor.id}
                        className="border border-gray-300 p-4 rounded-lg text-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        data-aos="fade-up"
                    >
                        <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg mb-2">{contributor.login}</h4>
                        <p className="text-sm text-gray-500">{contributor.contributions} commits</p>
                        <a
                            href={contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 mt-2 inline-block"
                        >
                            GitHub Profile
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contributors;