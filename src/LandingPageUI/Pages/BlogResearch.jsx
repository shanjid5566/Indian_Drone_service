import React from "react";
import { useTranslation } from "react-i18next";
// import card from "/assets/images/card1.png"
// import card1 from "/assets/images/card2.jpg";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const BlogResearch = () => {
  const { t } = useTranslation();

  const blogs = [
    {
      image: "/assets/images/card1.png",
      categoryKey: "blogs.agriculture.category",
      titleKey: "blogs.agriculture.title",
      descriptionKey: "blogs.agriculture.description",
      date: "March 15, 2025",
    },
    {
      image: "/assets/images/card2.jpg",
      categoryKey: "blogs.construction.category",
      titleKey: "blogs.construction.title",
      descriptionKey: "blogs.construction.description",
      date: "March 15, 2025",
    },
  ];

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("blogs.header")}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-3xl mx-auto">
            {t("blogs.subheader")}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 lg:mb-8 mb-5">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-sky-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56 lg:h-80 overflow-hidden">
                <img
                  src={blog.image}
                  alt={t(blog.titleKey)}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                {/* Category */}
                <p className="lg:text-sm text-xs font-semibold mb-2 text-green-600">
                  {t(blog.categoryKey)}
                </p>

                {/* Title */}
                <h3 className="lg:text-xl text-lg font-bold text-gray-900 mb-3">
                  {t(blog.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-gray-600 lg:text-sm text-xs mb-4">
                  {t(blog.descriptionKey)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500 lg:text-sm text-xs">
                    <FaCalendarAlt className="text-xs" />
                    <span>{blog.date}</span>
                  </div>

                  {/* Learn More Link */}
                  <Link
                    to={"/blog"}
                    className="text-green-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all text-sm"
                  >
                    {t("blogs.learnMore")}
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-2">
          <Link to={"/blog"} className="bg-green-600 hover:bg-green-700 text-white font-semibold lg:px-8 lg:py-3 px-4 py-2 text-sm rounded transition-colors duration-300">
            {t("blogs.viewAll")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogResearch;
