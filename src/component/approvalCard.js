import React from "react";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const ApprovalCard = () => {



    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)

    const [approvalamount, setapprovalamount] = useState()
    const [spenderAddr, setspenderAddr] = useState()

    const approveAccount = async () => {
        try {
            let value = (approvalamount * 10 ** 18).toFixed(0).toString();
            let approveacc = await contract.methods.approve(spenderAddr, value).send({
                from: accounts[0]
            })
            console.log('Approve', approveacc)
        } catch (error) {
            console.log("Approve error", error);
        }
    }

    return (
        <>
            <Card bg="danger" text="white" style={{ width: '28rem' }}>
                <Card.Header>A P P R O V A L</Card.Header>
                <Card.Body >
                    <Card.Title>Approval Function</Card.Title>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control value={approvalamount} onChange={(e) => setapprovalamount(e.target.value)} placeholder="Amount" />
                            </Col>
                            <Col>
                                <Form.Control value={spenderAddr} onChange={(e) => setspenderAddr(e.target.value)} placeholder="Address" />
                            </Col>
                            <Col>
                                <Button variant="warning" onClick={() => approveAccount()}>Approval</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Card.Text>
                       
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

export default ApprovalCard;