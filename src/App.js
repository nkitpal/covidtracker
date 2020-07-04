import React,{Component} from 'react';
import Cards from './components/Cards/Cards'
import CountryPicker from './components/CountryPicker/CountryPicker'
import Charts from './components/Charts/Charts'
import styles from './App.module.css'
import { fetchData } from './api'



class App extends Component{

    state = {
        data :{},
        country: ''
    }

    async componentDidMount() {
        
        const fetchedData = await fetchData('');

        this.setState({ data : fetchedData })
        console.log(fetchedData)
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country)

        this.setState({data: fetchedData})
    }

    render(){

        const { data } = this.state

        return(
            <div className={styles.container}>
                <Cards data={ data } />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts/>
            </div>
        )
    }
}

export default App;