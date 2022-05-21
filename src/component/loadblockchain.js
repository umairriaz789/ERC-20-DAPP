import React from 'react';
import '../App.css';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import Navbar from './navbar';
import Cards from '../component/transfercard';
import ApprovalCard from './approvalCard';
import TransferfromCard from './transferFrom';
import Row from 'react-bootstrap/esm/Row';


const Tx = require('ethereumjs-tx').Transaction;


function Blockchain() {

    const dispatch = useAppDispatch()
    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)

    const handleblockchain = () => {
        dispatch(loadBlockchain());
    }
    //contract amount address and balance
    const [amount, setamount] = useState()
    const [address, setaddress] = useState()
    const [userbalance, setuserbalance] = useState()


    // balance of contract
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

    return (
        <div className="App">
            <>
                <Navbar />
                <Row>
                    <Cards />
                    <ApprovalCard />
                    <TransferfromCard />
                </Row>
            </>
        </div>
    );
}

export default Blockchain;
