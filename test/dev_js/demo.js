import React from 'react';
import { render } from 'react-dom';
import PhoneInput from '../../src/index';
import '../../src/style/style.less';


class Demo extends React.Component {
  state = { country: 'br', value: '12345',
    playgroundProps: {country: 'us', enableAreaCodes: true} }

  playgroundKey = 1

  renderPlayground = (e) => {
    if (e.which === 13) {
      let playgroundProps;
      try { playgroundProps = JSON.parse(e.target.value) }
      catch(error) { console.error(error); e.preventDefault(); e.stopPropagation(); }
      this.setState({ playgroundProps }, () => ++this.playgroundKey)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  render() {
    return (
      <div style={{fontFamily: "'Roboto', sans-serif", fontSize: '15px', padding: '10px 25px', margin: '20px auto', maxWidth: '1500px', background: "linear-gradient(teal, turquoise)"}}>
        <style dangerouslySetInnerHTML={{__html: `
          input[type="tel"].custom-phone-input {
            font-size: 14px;
            border-color: #a0a0a0;
          }

          .custom-phone-button {
            background: rgb(200, 215, 225) !important;
            border-color: #a0a0a0 !important;
          }

          .custom-dropdown {
            margin-top: 0 !important;
          }

          .react-tel-input {
            margin-top: 15px;
          }
        `}} />
        <p style={{fontWeight: '500'}}>Created by <a style={{color: '#000'}}
          href="https://github.com/arshazar/react-phone-input-2">Arshazar</a></p>
        <div style={{display: 'inline-block', verticalAlign: 'top'}}>
          <p>Exclude countries (usa, canada)</p>
          <PhoneInput
            country='no'
            excludeCountries={['us', 'ca']}
          />
          <p>Only countries</p>
          <PhoneInput
            country='gb'
            onlyCountries={['gb', 'es']}
            preserveOrder={['onlyCountries']}
          />
          <p>Preferred countries</p>
          <PhoneInput
            country='it'
            preferredCountries={['it', 'se']}
          />
          <p>Persian digits</p>
          <PhoneInput
            enableSearch
            digitLang="per"
            enableAreaCodes
            placeholder="98 (912) 123-4567"
            country="ir"
          />
          <p>Auto country detect by value</p>
          <PhoneInput
            value='+3802343252'
            priority={{ca: 0, us: 1, kz: 0, ru: 1}}
          />
          <p>Search using iso2 or country name</p>
          <PhoneInput
            country='pl'
            searchClass='search-class'
            searchStyle={{margin: '0', width: '97%', height: '30px'}}
            enableSearch
            disableSearchIcon
            searchNotFound='Not found'
            prefix=''
          />
        </div>

        <div style={{display: 'inline-block', marginLeft: '40px'}}>
          <p>Local area codes with enableAreaCodes</p>
          <PhoneInput
            country='us'
            enableAreaCodes
          />
          <p>Dependent territories with enableTerritories</p>
          <PhoneInput
            country='vg'
            enableSearch
            enableTerritories
          />
          <p>Customizable styles</p>
          <PhoneInput
            placeholder='Type your phone here'
            inputStyle={{
              width: '300px',
              height: '35px',
              fontSize: '13px',
              paddingLeft: '48px',
              borderRadius: '5px'
            }}
            buttonStyle={{ borderRadius: '5px 0 0 5px' }}
            dropdownStyle={{ width: '300px' }}
          />
          <p>Customizable classes</p>
          <PhoneInput
            containerClass={'react-tel-input'}
            inputClass={'custom-phone-input'}
            buttonClass={'custom-phone-button'}
            dropdownClass={'custom-dropdown'}
          />
          <p>Custom masks & area codes</p>
          <PhoneInput
            country='at'
            onlyCountries={['fr', 'at', 'gr', 'us']}
            masks={{fr: '(...) ..-..-..', at: '(....) ...-....', zz: '... ...'}}
            areaCodes={{gr: ['2694', '2647'], fr: ['369', '463'], us: ['300']}}
            enableAreaCodes
          />
          <p>State manipulations</p>
          <PhoneInput
            value={this.state.value}
            onChange={(value, country, e, formattedValue) => {console.log(value, country, e, formattedValue);
              this.setState({ value })}}
            enableAreaCodes
            defaultErrorMessage='Invalid value'
            isValid={(value, country) => {
              if (value.match(/12345/)) {
                return 'Invalid value: '+value+', '+country.name
              } else if (value.match(/1234/)) {
                return false
              } else {
                return true
              }
            }}
          />
        </div>

        <div style={{display: 'inline-block', marginLeft: '40px', verticalAlign: 'top'}}>
          <p>Custom region selected: {`{'europe'}`}</p>
          <PhoneInput
            country='it'
            regions={'europe'}
            enableAreaCodes
          />
          <p>Custom regions selected: {`{['north-america', 'carribean']}`}</p>
          <PhoneInput
            country='ca'
            regions={['north-america', 'carribean']}
          />
          <p>Disabled dropdown and country code</p>
          <PhoneInput
            onlyCountries={['us']}
            country='us'
            placeholder='(702) 123-4567'
            disableCountryCode
            disableDropdown
          />
          <p>Autofocus</p>
          <PhoneInput
            country='de'
            onlyCountries={['de', 'es', 'us']}
            localization={{'Germany': 'Deutschland', 'Spain': 'España'}}
            countryCodeEditable={false}
            inputExtraProps={{
              name: 'tel',
              required: true,
              autoFocus: true
            }}
          />
          <p>enableAreaCodeStretch: +61 (2), +61 (02)</p>
          <PhoneInput
            onlyCountries={['au']}
            enableAreaCodes
            enableAreaCodeStretch
            country='au'
          />
          <p>State manipulations</p>
          <PhoneInput
            containerStyle={{marginBottom: '15px'}}
            country={this.state.country}
            prefix=''
            enableAreaCodes
          />
          <button onClick={() => {
            if (this.state.country == 'br') {this.setState({country: '1205'})}
            else {this.setState({country: 'br'})}
          }}>Change default country</button>
        </div>
        <div style={{display: 'inline-block', verticalAlign: 'top', border: "2px solid teal", borderRadius: "15px", padding: "0.5rem 1rem", margin: "1rem 0"}}>
          <div>
            <PhoneInput key={this.playgroundKey} style={{ width: "100%" }} {...this.state.playgroundProps} />
          </div>
          <div>
            <textarea name="" id="" cols="55" rows="3" spellCheck="false"
            onResize={undefined}
            style={{borderRadius: '5px', margin: "2rem 0 0", fontFamily: 'Roboto', fontSize: '14px', width: "100%", minHeight: "100px", outline: "none"}}
            onKeyDown={this.renderPlayground} defaultValue={JSON.stringify(this.state.playgroundProps)} />
            <p style={{ color: "gray", fontSize: "0.8em" }}>Press enter to render</p>
          </div>
        </div>
      </div>
    )
  }
}

export default render(
  <Demo />,
  document.getElementById('root')
);
