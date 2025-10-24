import React from "react";
import { useParams, Link } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();

  const article = {
    id: 1,
    title: "New Athletic Training Program Launched",
    excerpt:
      "We're excited to announce our new advanced athletic training program designed for elite athletes.",
    content: `
      <p>Our new training program incorporates the latest sports science research and cutting-edge technology to help athletes reach their peak performance. The program includes personalized training regimens, nutrition planning, and mental conditioning techniques developed by our world-class coaching staff.</p>
      
      <p>Over 50 athletes have already enrolled in the program's pilot phase, showing remarkable improvements in their performance metrics. The program focuses on three key areas:</p>
      
      <ul>
        <li><strong>Physical Development:</strong> Customized training plans based on individual athlete profiles</li>
        <li><strong>Nutrition Optimization:</strong> Personalized dietary plans to maximize performance and recovery</li>
        <li><strong>Mental Conditioning:</strong> Techniques to enhance focus, resilience, and competitive mindset</li>
      </ul>
      
      <p>Dr. Samuel Bekele, our Director of Sports Science, explains: "This program represents a significant advancement in how we approach athlete development. By integrating data from wearable technology with traditional coaching methods, we can create highly personalized training regimens that deliver measurable results."</p>
      
      <h3>Program Highlights</h3>
      
      <p>The program includes state-of-the-art facilities equipped with the latest technology:</p>
      
      <ul>
        <li>Biomechanics analysis lab with motion capture technology</li>
        <li>Environmental chamber for altitude and climate adaptation training</li>
        <li>Recovery center with cryotherapy and hydrotherapy options</li>
        <li>Nutrition planning kitchen with dedicated sports dietitians</li>
      </ul>
      
      <p>Athletes in the program will have access to our team of experts, including sports scientists, physiotherapists, nutritionists, and psychologists. This multidisciplinary approach ensures that every aspect of an athlete's development is addressed.</p>
      
      <blockquote>
        "This program has completely transformed my training. The personalized approach has helped me break through plateaus I've struggled with for years." - Alemitu Haile, Middle-Distance Runner
      </blockquote>
      
      <h3>Future Expansion</h3>
      
      <p>Following the success of the pilot program, we plan to expand these offerings to younger athletes in our development pipeline. The long-term goal is to create a seamless pathway from talent identification to elite performance.</p>
      
      <p>Coach Tewodros Abebe, Head of Youth Development, notes: "What we're learning from this program will inform how we develop our youth athletes. The sooner we can implement these evidence-based approaches, the greater impact we'll have on athlete development."</p>
      
      <p>Applications for the next cohort open next month. Athletes interested in joining should contact our admissions office for more information about eligibility requirements and the selection process.</p>
    `,
    date: "May 15, 2023",
    category: "training",
    readTime: "5 min read",
    author: "Coach Samuel Bekele",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    authorPosition: "Director of Sports Science",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    tags: ["Training", "Elite Athletes", "Program", "Sports Science"],
    relatedArticles: [
      {
        id: 2,
        title: "Institute Wins Regional Championship",
        excerpt:
          "Our athletes dominated the regional championships, bringing home 12 gold medals.",
        date: "April 28, 2023",
        category: "achievements",
        image:
          "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 3,
        title: "Nutrition Strategies for Peak Performance",
        excerpt:
          "A practical guide to fueling your body for optimal athletic performance and recovery.",
        date: "June 10, 2023",
        category: "nutrition",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 4,
        title: "Research on Athletic Performance Published",
        excerpt:
          "Our research team published groundbreaking findings on optimizing athletic performance.",
        date: "April 12, 2023",
        category: "research",
        image:
          "https://images.unsplash.com/photo-1554475900-0e035f5c9ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
      {/* Navigation */}
      <nav className="bg-[#21203C] py-4 ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mt-20">
            <Link to="/news" className="text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to News
            </Link>
            <div className="text-white">
              <span className="text-sm">Share:</span>
              <div className="inline-flex space-x-2 ml-3">
                <a href="#" className="hover:text-[#21203C]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#21203C]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#21203C]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <div className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="bg-[#F5F4FF] text-[#21203C] text-sm font-medium px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#21203C] mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>

            <div className="flex items-center mb-10">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-[#21203C]">{article.author}</p>
                <p className="text-gray-600 text-sm">
                  {article.authorPosition}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-96 md:h-[500px] mb-12">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="lg:w-2/3 lg:pr-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-16 h-16 rounded-full mr-6"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#21203C] mb-2">
                      About the Author
                    </h3>
                    <p className="text-gray-700">
                      {article.author} is {article.authorPosition} at Derartu
                      Tulu Sports Institute with over 15 years of experience in
                      sports science and athlete development. {article.author}{" "}
                      has published numerous research papers on athletic
                      performance and training methodologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-12 lg:mt-0">
              <div className="sticky top-6">
                {/* Related Articles */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                  <h3 className="text-lg font-bold text-[#21203C] mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {article.relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        to={`/article/${related.id}`}
                        className="block group"
                      >
                        <div className="flex items-start">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-[#21203C] group-hover:text-[#21203C] transition-colors leading-tight mb-1">
                              {related.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {related.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-[#21203C] rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                  <p className="text-[#E5E4FF] text-sm mb-4">
                    Subscribe to our newsletter to get the latest articles
                    delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg text-[#21203C] focus:outline-none focus:ring-2 focus:ring-[#21203C]"
                    />
                    <button className="w-full bg-[#21203C] hover:bg-[#2D2B4A] py-3 rounded-lg font-semibold transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Article CTA */}
      <div className="bg-gradient-to-r from-[#21203C] to-[#2D2B4A] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore more insights from Derartu Tulu Sports Institute
          </p>
          <Link
            to="/news"
            className="inline-flex items-center bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View All Articles
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .bg-blue-black {
          background-color: #21203c;
        }

        .text-blue-black {
          color: #21203c;
        }

        .prose {
          color: #374151;
          line-height: 1.7;
        }

        .prose h2 {
          color: #21203c;
          font-weight: 700;
          font-size: 1.5em;
          margin-top: 2em;
          margin-bottom: 1em;
        }

        .prose h3 {
          color: #21203c;
          font-weight: 600;
          font-size: 1.25em;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
        }

        .prose p {
          margin-bottom: 1.25em;
        }

        .prose ul {
          list-style-type: disc;
          padding-left: 1.625em;
          margin-bottom: 1.25em;
        }

        .prose li {
          margin-bottom: 0.5em;
        }

        .prose blockquote {
          border-left: 4px solid #21203c;
          padding-left: 1.5em;
          font-style: italic;
          color: #4b5563;
          margin: 2em 0;
        }

        .prose strong {
          color: #21203c;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
