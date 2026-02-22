import React, { useEffect, useState } from "react";

interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

const fetchContributors = async (): Promise<Contributor[]> => {
    const OWNER = "iTusharyadav";
    const REPO = "proofolio";
    const URL = `https://api.github.com/repos/${OWNER}/${REPO}/contributors`;

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error fetching contributors");
    }
};

const Contributors: React.FC = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState(true);
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
                <p className="text-lg animate-pulse">Loading contributors...</p>
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

    const inlineStyles = `
        .shine-effect { position: relative; overflow: hidden; transition: all 0.3s ease; }
        .shine-effect::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%); transform: skewX(-30deg); transition: all 0.5s ease; }
        .shine-effect:hover::before { left: 150%; }
        .card-glow-hover:hover { box-shadow: 0 0 40px rgba(52, 211, 163, 0.12), 0 0 10px rgba(52, 211, 163, 0.06); }
    `;

    return (
        <section className="py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100">
            <style>{inlineStyles}</style>
            {/* <section className="shine-effect card-glow-hover bg-[#243041] border border-white/5 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"> */}
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
                        Proofolio Contributors
                    </h2>
                    <p className="text-sm text-gray-500 mt-3">
                        Amazing developers contributing to the project 🚀
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {contributors.map((contributor) => (
                        <article
                            key={contributor.id}
                            className={
                                `shine-effect card-glow-hover rounded-xl p-6 shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl hover:backdrop-blur-md ` +
                                `bg-white border border-gray-100 dark:bg-transparent dark:border-white/5`
                            }
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                {/* Avatar with gradient background */}
                                <div className={`w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-cyan-200 to-teal-200 dark:from-teal-400/20 dark:to-cyan-300/10`}>
                                    <img
                                        src={contributor.avatar_url}
                                        alt={contributor.login}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {contributor.login}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {contributor.contributions} commits
                                </p>
                                <a
                                    href={contributor.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 text-sm font-medium text-cyan-500 hover:underline dark:text-teal-300 dark:hover:text-teal-200"
                                >
                                    View GitHub Profile →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contributors;