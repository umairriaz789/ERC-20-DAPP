import {CONTRACT_ADDRESS,CONTRACT_ABI} from '../../contract/Contract';
import Web3 from 'web3';
import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';


export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3loadingerror: null
}

export const loadBlockchain = createAsyncThunk("loadBlockchain", async( _, thunkAPI)=>{ 
    try {
        if(Web3.givenProvider && Web3.givenProvider.chainId=="0x3"){
            await Web3.givenProvider.enable();
            const web3 = new Web3(Web3.givenProvider);
            console.log('web3', web3)
            const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
            console.log('contract', contract)
            const accounts = await web3.eth.getAccounts();
            return {
                web3,
                accounts,
                contract,
            }
        }
        else{
            return{
                web3loadingerror: 'errorloading'

            }
        
        }
        
    } catch (error) {
        console.log('error',error)
        
    }
});


const web3ConnectSlice = createSlice({
    name: 'web3Connect',
    initialState,
    reducers: {},
    extraReducers:{
        [loadBlockchain.fulfilled.toString()]:(state,{payload}) =>{
            state.web3 = payload?.web3;
            state.contract= payload?.contract;
            state.accounts=payload?.accounts;

        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;
