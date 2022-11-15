import React, { useEffect, useState } from 'react'

const GoToTop = () => {
    //state toggle use of icon visible or invisiable
    const [isVisible, setIsVisible] = useState(false);

    //icon click in call function
    const gotoBtn = () => {
        return (
            //window position define
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        )
    }

    const listenScroll = () => {
        //store value in icon is hidden
        const heightHidden = 200;
        //scroll event value in store variable
        const winScroll = document.documentElement.scrollTop;

        //check scroll value less than hidden value 
        if (winScroll > heightHidden) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }
    useEffect(() => {
        //add event in scroll
        window.addEventListener("scroll", listenScroll);
        return
    }, [])

    return (
        <>
            {/* condition true to icon visible */}
            {isVisible === true ? <section>
                <div className='top-btn' onClick={gotoBtn}>
                    {/* arrow icon use  */}
                    <i className="btn-icon fa-solid fa-arrow-up"></i>
                </div>
            </section> : null}
        </>
    )
}

export default GoToTop;