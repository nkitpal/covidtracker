import React,{Component} from 'react';
import Cards from './components/Cards/Cards'
import CountryPicker from './components/CountryPicker/CountryPicker'
import Charts from './components/Charts/Charts'
import styles from './App.module.css'
import { fetchData } from './api'
import coronaImage from './images/COvid-19.png'
import { Divider, List } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';



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
                <List>
                    <Divider/>
                </List>
                <div className={styles.footer}>
                    <a href='https://covid19.mathdro.id/api' >Link to the API</a>
                    Created by Ankit Pal
                    <div>
                    <a href ='https://github.com/nkitpal/covidtracker'><GitHubIcon /></a>
                    <a href ='https://www.instagram.com/_nkitt/?hl=en'><InstagramIcon /></a>
                    </div>
                </div>
            </div>

        )
    }
}

export default App;