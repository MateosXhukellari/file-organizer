import Logo from '../assets/investment-calculator-logo.png'
export default function Header(){
    return(
        <div id='header'>
            <img src={Logo} alt='header img' />
            <header className='header'>
                Investment Calculator
            </header>
        </div>

    )

}