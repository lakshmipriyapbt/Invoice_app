import React, { useEffect, useState } from 'react'

const Footer = () => {
    const current=new Date();
    const date= current.getFullYear()
  return (
    <div>
        {/* footer */}
        {/* ============================================================== */}
        <footer className="footer text-center" style={{marginLeft:"275px"}}>
        Designed and Developed by <a href="pathbreaker.com"><b className='text-primary'>PathBreaker Technologies</b> @{date}</a>.
        </footer>
        {/* ============================================================== */}
        {/* End footer */}

    </div>
  )
}

export default Footer