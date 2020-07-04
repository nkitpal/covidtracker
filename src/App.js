import React,{Component} from 'react';
import Cards from './components/Cards/Cards'
import CountryPicker from './components/CountryPicker/CountryPicker'
import Charts from './components/Charts/Charts'
import styles from './App.module.css'
import { fetchData } from './api'
import coronaImage from './images/COvid-19.png'



class App extends Component{

    state = {
        data :{},
        country: ''
    }

    async componentDidMount() {
        
        const fetchedData = await fetchData('');

        this.setState({ data : fetchedData })
        
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country)

        this.setState({data: fetchedData, country: country})
    }

    render(){

        const { data, country } = this.state

        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt='COVID-19'/>
                <Cards data={ data } />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country}/>
                <hr/>
                <p>
                    API:<a href="https://covid19.mathdro.id/api">https://covid19.mathdro.id/api</a><br/>
                    Created by Ankit Pal
                </p>
            </div>
        )
    }
}

export default App;