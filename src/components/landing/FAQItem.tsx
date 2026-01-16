// Helper component for FAQ details (to clean up the main component)
const FAQItem: React.FC<{ question: string; answer: string; isDark: boolean }> = ({
  question,
  answer,
  isDark,
}) => {
  const t = { muted: isDark ? "text-gray-400" : "text-gray-500" };

  return (
    <details
      className={`${
        isDark
          ? "glass hover:glass-strong"
          : "bg-white border border-gray-100 hover:border-gray-300"
      } rounded-lg p-5 transition-all duration-300`}
    >
      <summary
        className={`font-semibold cursor-pointer flex items-center justify-between transition-colors`}
      >
        <span className="flex-1">{question}</span>
        <span className={`ml-3 text-lg ${isDark ? "text-teal-300" : "text-teal-600"}`}>
          +
        </span>
      </summary>
      <div
        className={`${t.muted} mt-3 pt-3 border-t ${
          isDark ? "border-white/5" : "border-gray-100"
        } text-sm leading-relaxed`}
      >
        {answer}
      </div>
    </details>
  );
};

export default FAQItem;