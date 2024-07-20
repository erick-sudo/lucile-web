import ControlledAccordions from "../ui/ControlledAccordions";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the purpose of this website?",
    answer:
      "Our website connects consumers to models by acting as a gateway to their external content. Models can showcase their profiles and link their social media accounts, while consumers can explore different categories and fetishes.",
  },
  {
    question: "How do models register on the website?",
    answer:
      "Models can register by creating an account and paying a non-refundable registration fee of $30. During registration, models will provide necessary details and link their social media accounts.",
  },
  {
    question: "What is the registration fee for models?",
    answer:
      "The registration fee for models is $30. This fee is non-refundable.",
  },
  {
    question:
      "What are the different categories and sub-categories for models?",
    answer:
      "Models can be categorized as men, women, couples (woman-woman, man-man, man-woman), and throuples (man-woman-man, woman-man-woman). Sub-categories include Cuckold, BDSM, Vanilla, Lesbian, Gay, Submissive, Dominant, Daddy Dom, Mommy Dom, Switch, Dominant submissive, Mistress, Goddess, Top, Bottom.",
  },
  {
    question: "What kind of content do models need to share?",
    answer:
      "Models are required to share 10 edited pictures or videos per month with us to help market their content.",
  },
  {
    question: "How can consumers access the website?",
    answer:
      "Consumers can access the website by paying an annual fee of $50. They will then have access to browse different models and categories.",
  },
  {
    question: "Do consumers need to provide personal details?",
    answer:
      "No, consumers do not need to provide personal details. They only need to pay the annual fee to access the site and view model profiles.",
  },
  {
    question: "What social media accounts can models link to their profiles?",
    answer:
      "Models can link their Instagram, Facebook, OnlyFans, Chaturbate, and other social media accounts to their profiles.",
  },
  {
    question: "Is the content of the models hosted on this website?",
    answer:
      "No, the content of the models is not hosted on our site. Our website acts as a gateway, directing consumers to the models' external content on their linked social media accounts.",
  },
  {
    question: "How does the payment process work?",
    answer:
      "Payments are handled securely through Stripe. Models pay a non-refundable registration fee, and consumers pay an annual fee for access. Payment statuses and transactions are tracked through our system.",
  },
];

export default function FAQ() {
  return (
    <div className="grid gap-4">
      <h3 className="font-semibold p-2 text-stone-950">
        Frequently asked questions
      </h3>
      <div className="">
        <ControlledAccordions
          initial={1}
          className="duration-300 cursor-pointer"
          expandedClassName="lucile-grad duration-300 shadow rounded"
          items={[...faqs, ...faqs].map(({ question, answer }) => ({
            summary: question,
            details: answer,
          }))}
          expand={{
            ExpandIcon: ({ expanded }) => (
              <span
                className={`h-6 w-6 flex items-center justify-center ${
                  expanded
                    ? "text-[#fff]"
                    : "text-pink-800 border rounded border-pink-800/20 bg-pink-50"
                }`}
              >
                <ChevronDownIcon height={12} />
              </span>
            ),
          }}
          Summary={({ expanded, summary }) => (
            <div
              className={`${
                expanded ? "text-stone-200" : "text-stone-900"
              }`}
            >
              {summary}
            </div>
          )}
          Details={({ expanded, details }) => (
            <div className={`${expanded ? "text-stone-100" : ""}`}>
              {details}
            </div>
          )}
        />
      </div>
    </div>
  );
}
