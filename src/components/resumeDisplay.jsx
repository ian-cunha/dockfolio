/* eslint-disable react/prop-types */

const ProjectListItem = ({ item }) => (
    <div className="mb-3 break-inside-avoid">
        <div className="flex items-center gap-3">
            <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.name}</h4>
            {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline text-sm">
                    Ver Projeto <i className="bi bi-box-arrow-up-right text-xs"></i>
                </a>
            )}
        </div>
        {item.description && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>}
    </div>
);

const StructuredListItem = ({ item }) => (
    <div className="mb-3 break-inside-avoid">
        <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
        <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm">{item.subtitle}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{item.period}</span>
            {item.location && <span> &middot; {item.location}</span>}
        </div>
        {item.description && <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>}
    </div>
);

const RenderListSection = ({ title, items, isGrid, isStructured, isProject }) => {
    if (!items || items.length === 0 || items.every(item => !item)) return null;

    const gridClass = title === 'Idiomas'
        ? "grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5"
        : "grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5";

    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-1 mb-2">{title}</h3>

            {isProject ? (
                <div className="space-y-2">{items.map((item, index) => item.name && <ProjectListItem key={index} item={item} />)}</div>
            ) : isStructured ? (
                <div className="space-y-2">{items.map((item, index) => item.title && <StructuredListItem key={index} item={item} />)}</div>
            ) : title === "Links" ? (
                <div className="space-y-1">{items.map((item, index) => item && (<a href={item} target="_blank" rel="noopener noreferrer" key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors group"> <i className="bi bi-link-45deg mr-2 text-indigo-500"></i> <span className="group-hover:underline break-words">{item}</span> </a>))}</div>
            ) : isGrid ? (
                <div className={gridClass}>{items.map((item, index) => item && (<div key={index} className="flex items-center bg-indigo-50 dark:bg-gray-700 p-1.5 rounded-md"> <i className="bi bi-check-circle-fill text-indigo-500 mr-2"></i> <p className="flex-1 text-sm text-gray-800 dark:text-gray-200">{item}</p> </div>))}</div>
            ) : (
                <ul className="list-disc pl-5 space-y-1 text-sm">{items.map((item, index) => item && (<li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>))}</ul>
            )}
        </div>
    );
};

const RenderTextSection = ({ title, content }) => {
    if (!content) return null;
    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-200 dark:border-indigo-800 pb-1 mb-2">{title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content}</p>
        </div>
    );
};

export const ResumeDisplay = ({ profileData }) => {
    if (!profileData) {
        return (
            <div className="text-center p-10">
                <span className="loader animate-spin border-4 border-t-indigo-500 rounded-full w-8 h-8 inline-block"></span>
                <p className="mt-3 text-gray-500">Carregando dados do currículo...</p>
            </div>
        );
    }

    const personalInfo = [
        { icon: 'bi-briefcase-fill', value: profileData?.func },
        { icon: 'bi-telephone-fill', value: profileData?.number },
        { icon: 'bi-envelope-fill', value: profileData?.emailData },
        { icon: 'bi-geo-alt-fill', value: profileData?.address }
    ];

    return (
        <>
            <style>{` @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print-container { box-shadow: none !important; margin: 0 !important; font-size: 10pt; } .break-inside-avoid { break-inside: avoid; } } `}</style>
            <div className="print-container container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
                <header className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                    {profileData.photoLink && (<img className="w-28 h-28 rounded-full object-cover ring-4 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-indigo-500" src={profileData.photoLink} alt="Foto de perfil" />)}
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">{profileData.fullName || "Seu Nome Completo"}</h2>

                        {/* A MUDANÇA ESTÁ AQUI */}
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            {personalInfo.map(({ icon, value }) => value && (
                                <p key={icon} className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                                    <i className={`${icon} text-indigo-500`}></i>
                                    <span>{value}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="data-container">
                    <RenderTextSection title="Resumo" content={profileData.resume} />
                    <RenderListSection title="Experiência" items={profileData.experiences} isStructured={true} />
                    <RenderListSection title="Formação" items={profileData.formations} isStructured={true} />
                    <RenderListSection title="Projetos" items={profileData.projects} isProject={true} />
                    <RenderListSection title="Links" items={profileData.links} />
                    <RenderListSection title="Competências" items={profileData.skills} isGrid={true} />
                    <RenderListSection title="Idiomas" items={profileData.languages} isGrid={true} />
                </div>
            </div>
        </>
    );
};