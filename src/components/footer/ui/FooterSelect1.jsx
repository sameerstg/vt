export default function FooterSelect1() {
    return (
        <>
            <ul className="p-0 m-0">
                <li className="list-inline-item bg-white">
                    <div className="dropdown bootstrap-select show-tick">
                        <button
                            type="button"
                            className="btn dropdown-toggle btn-light"
                            data-bs-toggle="dropdown"
                        >
                            <div className="filter-option">
                                <div className="filter-option-inner">
                                    <div className="filter-option-inner-inner">
                                        English
                                    </div>
                                </div>
                            </div>
                        </button>
                        <div className="dropdown-menu ">
                            <div className="inner show">
                                <ul className="dropdown-menu inner show">
                                    <li className="selected active">
                                        <a className="dropdown-item" id="bs-select-3-0">
                                            <span className="bs-ok-default check-mark" />
                                            <span className="text">English</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}
