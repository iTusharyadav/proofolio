import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import FAQItem from "./FAQItem";


export const FAQSection: React.FC = () => {
  const { t, isDark } = useTheme();

  return (
    <section
      id="faq"
      className="py-20 lg:py-24 fade-in"
      aria-label="FAQ"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2
          className={`text-3xl md:text-4xl font-semibold mb-12 text-center ${t.heading}`}
        >
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FAQItem
              question="How is the Developer Score calculated?"
              answer="The score is a complex, weighted combination of GitHub activity (commits, stars, code quality), LinkedIn presence (experience, endorsements), blogging metrics, and competitive coding performance. The algorithm is proprietary and uses heuristic-augmented AI."
              isDark={isDark}
            />
            <FAQItem
              question="Is my data safe and private?"
              answer="Yes — our architecture is designed for security. All sensitive operations, scoring, and third-party API calls run server-side using secure serverless functions and Supabase Row Level Security (RLS). Service role keys are never exposed in the browser."
              isDark={isDark}
            />
            <FAQItem
              question="What platforms do you connect to?"
              answer="Currently, we support in-depth analysis for GitHub, LinkedIn, and we offer optional analysis for custom technical blogs/portfolios and major coding platforms (e.g., LeetCode, HackerRank profiles)."
              isDark={isDark}
            />
            <FAQItem
              question="How long does it take to generate a report?"
              answer="Initial report generation is instantaneous once you provide your necessary profile links. Subsequent analysis updates typically complete within seconds due to efficient serverless processing."
              isDark={isDark}
            />
          </div>
          <div className="space-y-4">
            <FAQItem
              question="Is DevScore entirely free to use?"
              answer="Basic reports and core score tracking features are completely free. We plan to introduce premium tiers in the future for advanced features like in-depth AI goal setting, personalized technical writing reviews, and priority report generation."
              isDark={isDark}
            />
            <FAQItem
              question="Can I share my DevScore with recruiters or employers?"
              answer="Yes, the dashboard includes a feature to generate a shareable, verifiable link to your current Developer Score and key metric summaries. This is perfect for job applications and portfolio sites."
              isDark={isDark}
            />
            <FAQItem
              question="Can I export my reports?"
              answer="Currently, reports are viewable and shareable via a link. PDF and CSV export functionality for detailed reports and historical data is planned for the next major release."
              isDark={isDark}
            />
            <FAQItem
              question="I'm a new developer, will my score be low?"
              answer="The score is relative to your activity and progress. DevScore provides specific, achievable goals for beginners to increase their score quickly, focusing on fundamental public profile best practices."
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </section>
  )
}