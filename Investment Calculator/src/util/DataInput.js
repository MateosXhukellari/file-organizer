export default function Input({onChange, enteries}){
    return(
        <section id='user-input'>
            <div className='input-group'>
                <p>
                    <label>
                        Initial Investment
                    </label>

                    <input type="number"
                           required
                           value={enteries.initialInvestment}
                           onChange={(event) => onChange("initialInvestment", event.target.value)}/>
                </p>

                <p>
                    <label>
                        Annual Investment
                    </label>

                    <input type="number" required
                           value={enteries.annualInvestment}
                           onChange={(event) => onChange("annualInvestment", event.target.value)}/>
                </p>
            </div>

            <div className='input-group'>
                <p>
                    <label>
                        Expected Return
                    </label>

                    <input type="number" required
                           value={enteries.expectedReturn}
                           onChange={(event) => onChange("expectedReturn", event.target.value)}/>
                </p>

                <p>
                    <label>
                        Duration
                    </label>

                    <input type="number" required
                           value={enteries.duration}
                           onChange={(event) => onChange("duration", event.target.value)}/>
                </p>
            </div>
        </section>
    )
}