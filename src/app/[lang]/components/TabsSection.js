'use client'

import './components.css'

const BlogTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabsContainer">
      <ul className="tabsList">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>     
    </div>
  )
}

export default BlogTabs