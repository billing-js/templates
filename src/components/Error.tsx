export default () => {
  return (
    <div className='bg-white flex flex-row justify-between '>
      <span className='text-center w-full h-fit m-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-200'>
        ❌ An error occurred. Please{' '}
        <a
          href='https://documentation.merge.email/help/faq'
          target='_blank'
          className='text-blue-600 cursor-pointer'
          rel='noreferrer'
        >
          contact us
        </a>
        .
      </span>
    </div>
  )
}
