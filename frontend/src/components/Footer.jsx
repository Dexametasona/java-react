import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-4 w-full bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 pt-6 lg:pt-8">
        <hr className="my-4 border-line-color sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="inline font-body text-sm text-secondary-color sm:text-center ">
            © 2024{" "}
            <Link to={`/`} className="hover:underline mr-2 md:mr-4">
              Loop, Inc
            </Link>
            <p className="inline font-bold  mr-1 md:mr-2">.</p>
            <Link to={`/aboutUs`} className="hover:underline mr-2 md:mr-4">
              About us
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
