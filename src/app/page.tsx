const Home = () => {
  return (
    <main className="flex min-h-screen w-full p-12">
      <form className="max-w-2xl w-full mx-auto">
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for any movie title.." required />
      </form>
    </main>
  )
}

export default Home;