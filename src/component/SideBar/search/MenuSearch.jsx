import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useRef } from 'react'
import { NavSearch } from '../../navSearch/NavSearch'
import './MenuSearch.scss'
import { getAllProductService } from '../../../service/userService'
import { useNavigate } from 'react-router-dom'
import { Search } from '@material-ui/icons'

export const MenuSearch = (props) => {
    let { handleCloseSideBarFromParent } = props
    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
    }

    let navigate = useNavigate()
    ///NavSearch
    let [isOpenModalSearch, setIsOpenModalSearch] = useState(false)
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
    let [filterProduct, setFilterProduct] = useState()
    let [searchWord, setSearchword] = useState()
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {
                let allProducts = res.data
                let newFilter = allProducts.filter((item, index) => {
                    return removeVietnameseTones(item.productTitle.toLowerCase()).includes(removeVietnameseTones(searchWord.toLowerCase()))
                })
                if (searchWord === '') {
                    setFilterProduct([])
                }
                else { setFilterProduct(newFilter) }
                if (newFilter != []) {
                    setIsOpenModalSearch(true)
                }
            }
        }
        getAllProduct()
    }, [searchWord])

    /// Create function click outside begin
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpenModalSearch(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    /// Create function click outside end

    return (
        <div className="search-container">
            <div className="top-content">
                <div className='search-block'>
                    <span className='search-title'>TÌM KIẾM</span>
                    <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                </div>
            </div>
            <div className="center-content">
                <input className="center-content-top"
                    onChange={(e) => setSearchword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.keycode === 13) {
                            navigate(`/search/${searchWord}`)
                        }
                    }}
                />
                <i onClick={() => navigate(`/search/${searchWord}`)} >
                    <Search />
                </i>
            </div>
            {isOpenModalSearch && <div
                ref={wrapperRef}
                className="nav-search-component">
                <NavSearch

                    filterProduct={filterProduct}
                />
            </div>}
        </div>
    )
}
