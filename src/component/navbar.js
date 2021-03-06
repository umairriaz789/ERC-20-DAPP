import React from "react";
import Card from 'react-bootstrap/Card';
import '../index.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import Blockchain from "./loadblockchain";
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import Button from 'react-bootstrap/Button';
import img4 from '../imges/img4.png'


const Navbar = () => {
    const [userbalance, setuserbalance] = useState();



    const dispatch = useAppDispatch()
    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)

    const handleblockchain = () => {
        dispatch(loadBlockchain());
    }


    const balanceOf = async () => {
        try {
            let balance = await contract?.methods.balanceOf(accounts[0]).call()
            setuserbalance(balance);

        } catch (error) {
            console.log("error", error)

        }
    }
    useEffect(() => {
        if (contract) {
            balanceOf()
        }
    }, [contract])


    // get accounts
    const account = accounts[0];

    return (
        <>
            <Card className="bg-dark text-white text-xl-left" >
                <img src={img4} alt="imgsss"/>

                <Card.ImgOverlay>
                    <Card.Title className="texttitle">ERC-20 DApp</Card.Title>
                    <div className="connectButton">
                        <Button variant="danger" onClick={() => handleblockchain()}> Connect MetaMask</Button>
                    </div>

                    <Card.Text className="text">
                     Created By: Umair Riaz
                    </Card.Text>
                    <div className="badgess">
                        <Badge bg="success">Trnasfer</Badge> <Badge bg="danger">Approve</Badge> <Badge bg="light" text="dark">transferFrom</Badge>

                    </div>
                    <br/>
                    <div className="accountNum">
                    <Badge className="accountNum" bg="danger" >
                    Account Number: - {account}
                    </Badge>
                    </div>
                    
                    <Card.Text className="textbalance">
                        {
                            userbalance ?
                                <>
                                    <Badge bg="warning" text="dark">
                                
                                        USER BALANCE : {userbalance / 10 ** 18}
                                    </Badge>

                                </>
                                : ""
                        }


                    </Card.Text>
                    <br />

                </Card.ImgOverlay>
            </Card>

        </>
    )
}

export default Navbar;