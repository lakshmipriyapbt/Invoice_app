import React from 'react'

const Dash = () => {
  return (
    <div>
        <div className="preloader">
            <div className="lds-ripple">
            <div className="lds-pos" />
            <div className="lds-pos" />
            </div>
        </div>
        {/* ============================================================== */}
        {/* Main wrapper - style you can find in pages.scss */}
        {/* ============================================================== */}
        <div id="main-wrapper">
            {/* ============================================================== */}
            {/* Topbar header - style you can find in pages.scss */}
            {/* ============================================================== */}
            <header className="topbar" data-navbarbg="skin5">
            
            </header>
            {/* ============================================================== */}
            {/* End Topbar header */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Left Sidebar - style you can find in sidebar.scss  */}
            {/* ============================================================== */}
            <aside className="left-sidebar" data-sidebarbg="skin5">
            {/* Sidebar scroll*/}
            <div className="scroll-sidebar">
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav">
                <ul id="sidebarnav" className="p-t-30">
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="index.html" aria-expanded="false"><i className="mdi mdi-view-dashboard" /><span className="hide-menu">Dashboard</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="charts.html" aria-expanded="false"><i className="mdi mdi-chart-bar" /><span className="hide-menu">Charts</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="widgets.html" aria-expanded="false"><i className="mdi mdi-chart-bubble" /><span className="hide-menu">Widgets</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="tables.html" aria-expanded="false"><i className="mdi mdi-border-inside" /><span className="hide-menu">Tables</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="grid.html" aria-expanded="false"><i className="mdi mdi-blur-linear" /><span className="hide-menu">Full Width</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt" /><span className="hide-menu">Forms </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="form-basic.html" className="sidebar-link"><i className="mdi mdi-note-outline" /><span className="hide-menu"> Form Basic </span></a></li>
                        <li className="sidebar-item"><a href="form-wizard.html" className="sidebar-link"><i className="mdi mdi-note-plus" /><span className="hide-menu"> Form Wizard </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-buttons.html" aria-expanded="false"><i className="mdi mdi-relative-scale" /><span className="hide-menu">Buttons</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-face" /><span className="hide-menu">Icons </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="icon-material.html" className="sidebar-link"><i className="mdi mdi-emoticon" /><span className="hide-menu"> Material Icons </span></a></li>
                        <li className="sidebar-item"><a href="icon-fontawesome.html" className="sidebar-link"><i className="mdi mdi-emoticon-cool" /><span className="hide-menu"> Font Awesome Icons </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-elements.html" aria-expanded="false"><i className="mdi mdi-pencil" /><span className="hide-menu">Elements</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-move-resize-variant" /><span className="hide-menu">Addons </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="index2.html" className="sidebar-link"><i className="mdi mdi-view-dashboard" /><span className="hide-menu"> Dashboard-2 </span></a></li>
                        <li className="sidebar-item"><a href="pages-gallery.html" className="sidebar-link"><i className="mdi mdi-multiplication-box" /><span className="hide-menu"> Gallery </span></a></li>
                        <li className="sidebar-item"><a href="pages-calendar.html" className="sidebar-link"><i className="mdi mdi-calendar-check" /><span className="hide-menu"> Calendar </span></a></li>
                        <li className="sidebar-item"><a href="pages-invoice.html" className="sidebar-link"><i className="mdi mdi-bulletin-board" /><span className="hide-menu"> Invoice </span></a></li>
                        <li className="sidebar-item"><a href="pages-chat.html" className="sidebar-link"><i className="mdi mdi-message-outline" /><span className="hide-menu"> Chat Option </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-account-key" /><span className="hide-menu">Authentication </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="authentication-login.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Login </span></a></li>
                        <li className="sidebar-item"><a href="authentication-register.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Register </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-alert" /><span className="hide-menu">Errors </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="error-403.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 403 </span></a></li>
                        <li className="sidebar-item"><a href="error-404.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 404 </span></a></li>
                        <li className="sidebar-item"><a href="error-405.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 405 </span></a></li>
                        <li className="sidebar-item"><a href="error-500.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 500 </span></a></li>
                    </ul>
                    </li>
                </ul>
                </nav>
                {/* End Sidebar navigation */}
            </div>
            {/* End Sidebar scroll*/}
            </aside>
            {/* ============================================================== */}
            {/* End Left Sidebar - style you can find in sidebar.scss  */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Page wrapper  */}
            {/* ============================================================== */}
            <div className="page-wrapper">
            {/* ============================================================== */}
            {/* Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            <div className="page-breadcrumb">
                <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                    <h4 className="page-title">Dashboard</h4>
                    <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            {/* ============================================================== */}
            {/* End Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Container fluid  */}
            {/* ============================================================== */}
            <div className="container-fluid">
                {/* ============================================================== */}
                {/* Sales Cards  */}
                {/* ============================================================== */}
                <div className="row">
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-cyan text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-view-dashboard" /></h1>
                        <h6 className="text-white">Dashboard</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-4 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-success text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-chart-areaspline" /></h1>
                        <h6 className="text-white">Charts</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-warning text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-collage" /></h1>
                        <h6 className="text-white">Widgets</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-danger text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-border-outside" /></h1>
                        <h6 className="text-white">Tables</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-info text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-arrow-all" /></h1>
                        <h6 className="text-white">Full Width</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                {/* Column */}
                <div className="col-md-6 col-lg-4 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-danger text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-receipt" /></h1>
                        <h6 className="text-white">Forms</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-info text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-relative-scale" /></h1>
                        <h6 className="text-white">Buttons</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-cyan text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-pencil" /></h1>
                        <h6 className="text-white">Elements</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-success text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-calendar-check" /></h1>
                        <h6 className="text-white">Calnedar</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-md-6 col-lg-2 col-xlg-3">
                    <div className="card card-hover">
                    <div className="box bg-warning text-center">
                        <h1 className="font-light text-white"><i className="mdi mdi-alert" /></h1>
                        <h6 className="text-white">Errors</h6>
                    </div>
                    </div>
                </div>
                {/* Column */}
                </div>
                {/* ============================================================== */}
                {/* Sales chart */}
                {/* ============================================================== */}
                <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-body">
                        <div className="d-md-flex align-items-center">
                        <div>
                            <h4 className="card-title">Site Analysis</h4>
                            <h5 className="card-subtitle">Overview of Latest Month</h5>
                        </div>
                        </div>
                        <div className="row">
                        {/* column */}
                        <div className="col-lg-9">
                            <div className="flot-chart">
                            <div className="flot-chart-content" id="flot-line-chart" />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="row">
                            <div className="col-6">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-user m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">2540</h5>
                                <small className="font-light">Total Users</small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-plus m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">120</h5>
                                <small className="font-light">New Users</small>
                                </div>
                            </div>
                            <div className="col-6 m-t-15">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-cart-plus m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">656</h5>
                                <small className="font-light">Total Shop</small>
                                </div>
                            </div>
                            <div className="col-6 m-t-15">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-tag m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">9540</h5>
                                <small className="font-light">Total Orders</small>
                                </div>
                            </div>
                            <div className="col-6 m-t-15">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-table m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">100</h5>
                                <small className="font-light">Pending Orders</small>
                                </div>
                            </div>
                            <div className="col-6 m-t-15">
                                <div className="bg-dark p-10 text-white text-center">
                                <i className="fa fa-globe m-b-5 font-16" />
                                <h5 className="m-b-0 m-t-5">8540</h5>
                                <small className="font-light">Online Orders</small>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* column */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/* ============================================================== */}
                {/* Sales chart */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* Recent comment and chats */}
                {/* ============================================================== */}
                <div className="row">
                {/* column */}
                <div className="col-lg-6">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Latest Posts</h4>
                    </div>
                    <div className="comment-widgets scrollable">
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row m-t-0">
                        <div className="p-2"><img src="assets/images/users/1.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                            <h6 className="font-medium">James Anderson</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">April 14, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row">
                        <div className="p-2"><img src="assets/images/users/4.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text active w-100">
                            <h6 className="font-medium">Michael Jorden</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">May 10, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row">
                        <div className="p-2"><img src="assets/images/users/5.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                            <h6 className="font-medium">Johnathan Doeting</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">August 1, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Card */}
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">To Do List</h4>
                        <div className="todo-widget scrollable" style={{height: 450}}>
                        <ul className="list-task todo-list list-group m-b-0" data-role="tasklist">
                            <li className="list-group-item todo-item" data-role="task">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                <label className="custom-control-label todo-label" htmlFor="customCheck">
                                <span className="todo-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span> <span className="badge badge-pill badge-danger float-right">Today</span>
                                </label>
                            </div>
                            <ul className="list-style-none assignedto">
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/1.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Steave" /></li>
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/2.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Jessica" /></li>
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/3.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Priyanka" /></li>
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/4.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Selina" /></li>
                            </ul>
                            </li>
                            <li className="list-group-item todo-item" data-role="task">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label todo-label" htmlFor="customCheck1">
                                <span className="todo-desc">Lorem Ipsum is simply dummy text of the printing</span><span className="badge badge-pill badge-primary float-right">1 week </span>
                                </label>
                            </div>
                            <div className="item-date"> 26 jun 2017</div>
                            </li>
                            <li className="list-group-item todo-item" data-role="task">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                <label className="custom-control-label todo-label" htmlFor="customCheck2">
                                <span className="todo-desc">Give Purchase report to</span> <span className="badge badge-pill badge-info float-right">Yesterday</span>
                                </label>
                            </div>
                            <ul className="list-style-none assignedto">
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/3.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Priyanka" /></li>
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/4.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Selina" /></li>
                            </ul>
                            </li>
                            <li className="list-group-item todo-item" data-role="task">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                <label className="custom-control-label todo-label" htmlFor="customCheck3">
                                <span className="todo-desc">Lorem Ipsum is simply dummy text of the printing </span> <span className="badge badge-pill badge-warning float-right">2 weeks</span>
                                </label>
                            </div>
                            <div className="item-date"> 26 jun 2017</div>
                            </li>
                            <li className="list-group-item todo-item" data-role="task">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck4" />
                                <label className="custom-control-label todo-label" htmlFor="customCheck4">
                                <span className="todo-desc">Give Purchase report to</span> <span className="badge badge-pill badge-info float-right">Yesterday</span>
                                </label>
                            </div>
                            <ul className="list-style-none assignedto">
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/3.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Priyanka" /></li>
                                <li className="assignee"><img className="rounded-circle" width={40} src="assets/images/users/4.jpg" alt="user" data-toggle="tooltip" data-placement="top" title data-original-title="Selina" /></li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    {/* card */}
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title m-b-0">Progress Box</h4>
                        <div className="m-t-20">
                        <div className="d-flex no-block align-items-center">
                            <span>81% Clicks</span>
                            <div className="ml-auto">
                            <span>125</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '81%'}} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        </div>
                        <div>
                        <div className="d-flex no-block align-items-center m-t-25">
                            <span>72% Uniquie Clicks</span>
                            <div className="ml-auto">
                            <span>120</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: '72%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        </div>
                        <div>
                        <div className="d-flex no-block align-items-center m-t-25">
                            <span>53% Impressions</span>
                            <div className="ml-auto">
                            <span>785</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: '53%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        </div>
                        <div>
                        <div className="d-flex no-block align-items-center m-t-25">
                            <span>3% Online Users</span>
                            <div className="ml-auto">
                            <span>8</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: '3%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* card new */}
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title m-b-0">News Updates</h4>
                    </div>
                    <ul className="list-style-none">
                        <li className="d-flex no-block card-body">
                        <i className="fa fa-check-circle w-30px m-t-5" />
                        <div>
                            <a href="#" className="m-b-0 font-medium p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a>
                            <span className="text-muted">dolor sit amet, consectetur adipiscing</span>
                        </div>
                        <div className="ml-auto">
                            <div className="tetx-right">
                            <h5 className="text-muted m-b-0">20</h5>
                            <span className="text-muted font-16">Jan</span>
                            </div>
                        </div>
                        </li>
                        <li className="d-flex no-block card-body border-top">
                        <i className="fa fa-gift w-30px m-t-5" />
                        <div>
                            <a href="#" className="m-b-0 font-medium p-0">Congratulation Maruti, Happy Birthday</a>
                            <span className="text-muted">many many happy returns of the day</span>
                        </div>
                        <div className="ml-auto">
                            <div className="tetx-right">
                            <h5 className="text-muted m-b-0">11</h5>
                            <span className="text-muted font-16">Jan</span>
                            </div>
                        </div>
                        </li>
                        <li className="d-flex no-block card-body border-top">
                        <i className="fa fa-plus w-30px m-t-5" />
                        <div>
                            <a href="#" className="m-b-0 font-medium p-0">Maruti is a Responsive Admin theme</a>
                            <span className="text-muted">But already everything was solved. It will ...</span>
                        </div>
                        <div className="ml-auto">
                            <div className="tetx-right">
                            <h5 className="text-muted m-b-0">19</h5>
                            <span className="text-muted font-16">Jan</span>
                            </div>
                        </div>
                        </li>
                        <li className="d-flex no-block card-body border-top">
                        <i className="fa fa-leaf w-30px m-t-5" />
                        <div>
                            <a href="#" className="m-b-0 font-medium p-0">Envato approved Maruti Admin template</a>
                            <span className="text-muted">i am very happy to approved by TF</span>
                        </div>
                        <div className="ml-auto">
                            <div className="tetx-right">
                            <h5 className="text-muted m-b-0">20</h5>
                            <span className="text-muted font-16">Jan</span>
                            </div>
                        </div>
                        </li>
                        <li className="d-flex no-block card-body border-top">
                        <i className="fa fa-question-circle w-30px m-t-5" />
                        <div>
                            <a href="#" className="m-b-0 font-medium p-0"> I am alwayse here if you have any question</a>
                            <span className="text-muted">we glad that you choose our template</span>
                        </div>
                        <div className="ml-auto">
                            <div className="tetx-right">
                            <h5 className="text-muted m-b-0">15</h5>
                            <span className="text-muted font-16">Jan</span>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                {/* column */}
                <div className="col-lg-6">
                    {/* Card */}
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Chat Option</h4>
                        <div className="chat-box scrollable" style={{height: 475}}>
                        {/*chat Row */}
                        <ul className="chat-list">
                            {/*chat Row */}
                            <li className="chat-item">
                            <div className="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                            <div className="chat-content">
                                <h6 className="font-medium">James Anderson</h6>
                                <div className="box bg-light-info">Lorem Ipsum is simply dummy text of the printing &amp; type setting industry.</div>
                            </div>
                            <div className="chat-time">10:56 am</div>
                            </li>
                            {/*chat Row */}
                            <li className="chat-item">
                            <div className="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>
                            <div className="chat-content">
                                <h6 className="font-medium">Bianca Doe</h6>
                                <div className="box bg-light-info">It’s Great opportunity to work.</div>
                            </div>
                            <div className="chat-time">10:57 am</div>
                            </li>
                            {/*chat Row */}
                            <li className="odd chat-item">
                            <div className="chat-content">
                                <div className="box bg-light-inverse">I would love to join the team.</div>
                                <br />
                            </div>
                            </li>
                            {/*chat Row */}
                            <li className="odd chat-item">
                            <div className="chat-content">
                                <div className="box bg-light-inverse">Whats budget of the new project.</div>
                                <br />
                            </div>
                            <div className="chat-time">10:59 am</div>
                            </li>
                            {/*chat Row */}
                            <li className="chat-item">
                            <div className="chat-img"><img src="assets/images/users/3.jpg" alt="user" /></div>
                            <div className="chat-content">
                                <h6 className="font-medium">Angelina Rhodes</h6>
                                <div className="box bg-light-info">Well we have good budget for the project</div>
                            </div>
                            <div className="chat-time">11:00 am</div>
                            </li>
                            {/*chat Row */}
                        </ul>
                        </div>
                    </div>
                    <div className="card-body border-top">
                        <div className="row">
                        <div className="col-9">
                            <div className="input-field m-t-0 m-b-0">
                            <textarea id="textarea1" placeholder="Type and enter" className="form-control border-0" defaultValue={""} />
                            </div>
                        </div>
                        <div className="col-3">
                            <a className="btn-circle btn-lg btn-cyan float-right text-white" href="javascript:void(0)"><i className="fas fa-paper-plane" /></a>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* card */}
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Our partner (Box with Fix height)</h4>
                    </div>
                    <div className="comment-widgets scrollable" style={{maxHeight: 130}}>
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row m-t-0">
                        <div className="p-2"><img src="assets/images/users/1.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                            <h6 className="font-medium">James Anderson</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">April 14, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row">
                        <div className="p-2"><img src="assets/images/users/4.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text active w-100">
                            <h6 className="font-medium">Michael Jorden</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">May 10, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                        {/* Comment Row */}
                        <div className="d-flex flex-row comment-row">
                        <div className="p-2"><img src="assets/images/users/5.jpg" alt="user" width={50} className="rounded-circle" /></div>
                        <div className="comment-text w-100">
                            <h6 className="font-medium">Johnathan Doeting</h6>
                            <span className="m-b-15 d-block">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>
                            <div className="comment-footer">
                            <span className="text-muted float-right">August 1, 2016</span> 
                            <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                            <button type="button" className="btn btn-success btn-sm">Publish</button>
                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* accoridan part */}
                    <div className="accordion" id="accordionExample">
                    <div className="card m-b-0">
                        <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <i className="m-r-5 fa fa-magnet" aria-hidden="true" />
                            <span>Accordion Example 1</span>
                            </a>
                        </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                    <div className="card m-b-0 border-top">
                        <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <i className="m-r-5 fa fa-magnet" aria-hidden="true" />
                            <span>Accordion Example 2</span>
                            </a>
                        </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                    <div className="card m-b-0 border-top">
                        <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <i className="m-r-5 fa fa-magnet" aria-hidden="true" />
                            <span>Accordion Example 3</span>
                            </a>
                        </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* toggle part */}
                    <div id="accordian-4">
                    <div className="card m-t-30">
                        <a className="card-header link" data-toggle="collapse" data-parent="#accordian-4" href="#Toggle-1" aria-expanded="true" aria-controls="Toggle-1">
                        <i className="seticon fa fa-arrow-right" aria-hidden="true" />
                        <span>Toggle, Open by default</span>
                        </a>
                        <div id="Toggle-1" className="collapse show multi-collapse">
                        <div className="card-body widget-content">
                            This box is opened by default, paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end.
                        </div>
                        </div>
                        <a className="card-header link border-top" data-toggle="collapse" data-parent="#accordian-4" href="#Toggle-2" aria-expanded="false" aria-controls="Toggle-2">
                        <i className="seticon fa fa-times" aria-hidden="true" />
                        <span>Toggle, Closed by default</span>
                        </a>
                        <div id="Toggle-2" className="multi-collapse collapse" style={{}}>
                        <div className="card-body widget-content">
                            This box is now open
                        </div>
                        </div>
                        <a className="card-header collapsed link border-top" data-toggle="collapse" data-parent="#accordian-4" href="#Toggle-3" aria-expanded="false" aria-controls="Toggle-3">
                        <i className="seticon fa fa-times" aria-hidden="true" />
                        <span>Toggle, Closed by default</span>
                        </a>
                        <div id="Toggle-3" className="collapse multi-collapse">
                        <div className="card-body widget-content">
                            This box is now open
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Tabs */}
                    <div className="card">
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#home" role="tab"><span className="hidden-sm-up" /> <span className="hidden-xs-down">Tab1</span></a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#profile" role="tab"><span className="hidden-sm-up" /> <span className="hidden-xs-down">Tab2</span></a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#messages" role="tab"><span className="hidden-sm-up" /> <span className="hidden-xs-down">Tab3</span></a> </li>
                    </ul>
                    {/* Tab panes */}
                    <div className="tab-content tabcontent-border">
                        <div className="tab-pane active" id="home" role="tabpanel">
                        <div className="p-20">
                            <p>And is full of waffle to It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end.multiple paragraphs and is full of waffle to pad out the comment..</p>
                            <img src="assets/images/background/img4.jpg" className="img-fluid" />
                        </div>
                        </div>
                        <div className="tab-pane  p-20" id="profile" role="tabpanel">
                        <div className="p-20">
                            <img src="assets/images/background/img4.jpg" className="img-fluid" />
                            <p className="m-t-10">And is full of waffle to It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end.multiple paragraphs and is full of waffle to pad out the comment..</p>
                        </div>
                        </div>
                        <div className="tab-pane p-20" id="messages" role="tabpanel">
                        <div className="p-20">
                            <p>And is full of waffle to It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end.multiple paragraphs and is full of waffle to pad out the comment..</p>
                            <img src="assets/images/background/img4.jpg" className="img-fluid" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/* ============================================================== */}
                {/* Recent comment and chats */}
                {/* ============================================================== */}
            </div>
            {/* ============================================================== */}
            {/* End Container fluid  */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* footer */}
            {/* ============================================================== */}
            <footer className="footer text-center">
                All Rights Reserved by Matrix-admin. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
            </footer>
            {/* ============================================================== */}
            {/* End footer */}
            {/* ============================================================== */}
            </div>
            {/* ============================================================== */}
            {/* End Page wrapper  */}
            {/* ============================================================== */}
        </div>
    </div>

  )
}

export default Dash