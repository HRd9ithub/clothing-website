import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChangePassword from './ChangePassword';
import OrderDetail from './OrderDetail';

const TabPanel = () => {
    return (
        <>
            <div className='container ' >
                <div className='col-md-10 mt-3 mx-auto'>
                    <Tabs
                        defaultActiveKey="order-Detail"
                        id="uncontrolled-tab-example"
                        className="mb-3" >
                        <Tab eventKey="order-Detail" title="orderDetail">
                            <OrderDetail/>
                        </Tab>
                        <Tab eventKey="Change Password" title="Change Password">
                            <ChangePassword/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default TabPanel