
function Breadcrumb({parent}) {
    return(
        <ul className="flex text-sm lg:text-base">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-500">
              Home
            </a>
            <svg
              className="h-5 w-auto text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </li>
          <li className="inline-flex items-center">
            <a href="/" className="text-blue-500">
              {parent}
            </a>
          </li>
        </ul>
    )
}
export default Breadcrumb;