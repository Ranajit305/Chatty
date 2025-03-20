import React from 'react'

const EmptyChatContainer = () => {
  return (
      <div className="md:flex hidden flex-col text-center h-full items-center justify-center">
          <div className="p-6 bg-gray-100 rounded-full flex items-center justify-center">
              {/* Chat Icon */}
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 text-gray-400"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.14 9-7s-4.03-7-9-7-9 3.14-9 7c0 1.6.64 3.08 1.72 4.3-.12 1.62-.82 3.13-1.42 4.2a.75.75 0 001.04.96c1.63-1.01 3.52-2.23 4.93-2.79a9.66 9.66 0 003.73.69z"
                  />
              </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Messages Yet</h3>
          <p className="text-sm px-4">
              Start a new conversation by sending a message.
          </p>
      </div>
  )
}

export default EmptyChatContainer