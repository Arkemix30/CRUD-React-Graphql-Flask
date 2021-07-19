
function Nav() {
  return (
    <nav class="flex flex-wrap items-center justify-between p-5 bg-gray-700	">      
        <div class="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">        
            <a href="#" class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Users</a>
            <a href="#" class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">About</a>
        </div>
    </nav>  
  );
}

export default Nav;
