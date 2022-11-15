import React, { useEffect, useState } from 'react';

//get props indivaul
const Pagination = ({ showCard, onPagination, total }) => {
    const [count, setCount] = useState(1);
    //page number mange in use state
    const [numberPage, setNumberPage] = useState(Math.ceil(total / showCard));

    useEffect(() => {
        const value = showCard * count;
        onPagination(value - showCard, value)
    }, [count]);

    //Previous and next button click of call function
    const countButton = (type) => {
        if (type === "prev") {
            if (count === 1) {
                setCount(1);
            } else {
                setCount(count - 1)
            }
        } else if (type === "next") {
            if (numberPage === count) {
                setCount(count)
            } else {
                setCount(count + 1)
            }
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination ">
                        <li className="page-item">
                            <a className="page-link"
                                href="#"
                                onClick={() => countButton("prev")}>
                                Previous
                            </a>
                        </li>
                        {
                            new Array(numberPage).fill("").map((elem, ind) => (
                                <li className={`page-item ${ind + 1 === count ? "active" : null}`} key={ind}>
                                    <a className="page-link"
                                        href="#"
                                        onClick={() => setCount(ind + 1)}>
                                        {ind + 1}
                                    </a>
                                </li>
                            )
                            )
                        }
                        <li className="page-item">
                            <a className="page-link"
                                href="#"
                                onClick={() => countButton("next")}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination