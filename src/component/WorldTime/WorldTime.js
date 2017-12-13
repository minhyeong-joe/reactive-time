import React, { Component } from 'react';
import './WorldTime.css';

export default class WorldTime extends Component {
  constructor(){
    super();
    this.state={
      month: null,
      date: null,
      day: null,
      hr: '0',
      min: '00',
      sec: '00',
      ampm: 'AM',
      interval: null,
      offset: -12,
    }
  }

  componentWillMount() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const UTC = localTime+localOffset;
    const offset = this.state.offset;
    const gmt_12 = UTC + (3600000*offset);
    const nd = new Date(gmt_12);
    this.adjustTime(nd.getMonth(), nd.getDate(), nd.getDay(), nd.getHours(), nd.getMinutes(), nd.getSeconds());

    const interval = setInterval(()=>{
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const UTC = localTime+localOffset;
      const offset = this.state.offset;
      const gmt_12 = UTC + (3600000*offset);
      const nd = new Date(gmt_12);
      this.adjustTime(nd.getMonth(), nd.getDate(), nd.getDay(), nd.getHours(), nd.getMinutes(), nd.getSeconds());
    }, 1000);
    this.setState({
      interval: interval
    });
  }


  adjustTime(month, date, day, hr, min, sec) {
    let ampm = 'AM'
    if (hr === 12) {
      ampm = 'PM'
    }
    if(hr===0){
      hr = 12;
    }
    else if(hr>=13){
      hr = hr - 12;
      ampm = 'PM';
    }
    if(min<10){
      min = '0'+min;
    }
    if(sec<10){
      sec = '0'+sec;
    }
    switch(month) {
      case 0:
        month='JAN';
        break;
      case 1:
      month = 'FEB';
      break;
      case 2:
      month = 'MAR';
      break;
      case 3:
      month = 'APR';
      break;
      case 4:
      month = 'MAY';
      break;
      case 5:
      month = 'JUN';
      break;
      case 6:
      month = 'JUL';
      break;
      case 7:
      month = 'AUG';
      break;
      case 8:
      month = 'SEP';
      break;
      case 9:
      month = 'OCT';
      break;
      case 10:
      month = 'NOV';
      break;
      case 11:
      month = 'DEC';
      break;
      default:
    }
    switch(day) {
      case 0:
      day = 'SUNDAY';
      break;
      case 1:
      day = 'MONDAY';
      break;
      case 2:
      day = 'TUESDAY';
      break;
      case 3:
      day = 'WEDNESDAY';
      break;
      case 4:
      day = 'THURSDAY';
      break;
      case 5:
      day = 'FRIDAY';
      break;
      case 6:
      day = 'SATURDAY';
      break;
      default:
    }
    this.setState({
      month: month,
      date: date,
      day: day,
      hr: hr,
      min: min,
      sec: sec,
      ampm: ampm
    });
  }

  onTimezoneChange(e) {
    clearInterval(this.state.interval);
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const UTC = localTime+localOffset;
    this.setState({
      offset: e.target.value
    })
    const offset = e.target.value;
    const gmt_12 = UTC + (3600000*offset);
    const nd = new Date(gmt_12);
    this.adjustTime(nd.getMonth(), nd.getDate(), nd.getDay(), nd.getHours(), nd.getMinutes(), nd.getSeconds());

    const interval = setInterval(()=>{
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const UTC = localTime+localOffset;
      const offset = this.state.offset;
      const gmt_12 = UTC + (3600000*offset);
      const nd = new Date(gmt_12);
      this.adjustTime(nd.getMonth(), nd.getDate(), nd.getDay(), nd.getHours(), nd.getMinutes(), nd.getSeconds());
    }, 1000);
    this.setState({
      interval: interval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }


  render() {
    return (
      <div className="worldtimeBody">
        <p className="worldtimeTitle">WORLD TIME</p>
        <div className="pickTimezone">
          <label>Select the Time Zone:</label>
          <select onChange={this.onTimezoneChange.bind(this)} name="timezoneList" className="timezoneList">
            <option value="-12">(GMT-12:00) International Date Line West</option>
            <option value="-11">(GMT-11:00) Midway Island, Samoa</option>
            <option value="-10">(GMT-10:00) Hawaii</option>
            <option value="-9">(GMT-09:00) Alaska</option>
            <option value="-8">(GMT-08:00) Pacific Time (US and Canada); Tijuana</option>
            <option value="-7">(GMT-07:00) Mountain Time (US and Canada)</option>
            <option value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
            <option value="-7">(GMT-07:00) Arizona</option>
            <option value="-6">(GMT-06:00) Central Time (US and Canada</option>
            <option value="-6">(GMT-06:00) Saskatchewan</option>
            <option value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
            <option value="-6">(GMT-06:00) Central America</option>
            <option value="-5">	(GMT-05:00) Eastern Time (US and Canada)</option>
            <option value="-5">	(GMT-05:00) Indiana (East)</option>
            <option value="-5">	(GMT-05:00) Bogota, Lima, Quito</option>
            <option value="-4">	(GMT-04:00) Atlantic Time (Canada)</option>
            <option value="-4">	(GMT-04:00) Caracas, La Paz</option>
            <option value="-4">	(GMT-04:00) Santiago</option>
            <option value="-3.5">	(GMT-03:30) Newfoundland and Labrador</option>
            <option value="-3">	(GMT-03:00) Brasilia</option>
            <option value="-3">	(GMT-03:00) Buenos Aires, Georgetown</option>
            <option value="-3">	(GMT-03:00) Greenland</option>
            <option value="-2">	(GMT-02:00) Mid-Atlantic</option>
            <option value="-1">	(GMT-01:00) Azores</option>
            <option value="-1">	(GMT-01:00) Cape Verde Islands</option>
            <option value="0">(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London</option>
            <option value="0">	(GMT) Casablanca, Monrovia</option>
            <option value="+1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
            <option value="+1">	(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
            <option value="+1">	(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
            <option value="+1">	(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
            <option value="+1">	(GMT+01:00) West Central Africa</option>
            <option value="+2">	(GMT+02:00) Bucharest</option>
            <option value="+2">	(GMT+02:00) Cairo</option>
            <option value="+2">	(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius</option>
            <option value="+2">	(GMT+02:00) Athens, Istanbul, Minsk</option>
            <option value="+2">	(GMT+02:00) Jerusalem</option>
            <option value="+2">	(GMT+02:00) Harare, Pretoria</option>
            <option value="+3">	(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
            <option value="+3">	(GMT+03:00) Kuwait, Riyadh</option>
            <option value="+3">	(GMT+03:00) Nairobi</option>
            <option value="+3">	(GMT+03:00) Baghdad</option>
            <option value="+3.5">	(GMT+03:30) Tehran</option>
            <option value="+4">	(GMT+04:00) Abu Dhabi, Muscat</option>
            <option value="+4">	(GMT+04:00) Baku, Tbilisi, Yerevan</option>
            <option value="+4.5">	(GMT+04:30) Kabul</option>
            <option value="+5">	(GMT+05:00) Ekaterinburg</option>
            <option value="+5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
            <option value="+5.5">	(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            <option value="+5.75">	(GMT+05:45) Kathmandu</option>
            <option value="+6">	(GMT+06:00) Astana, Dhaka</option>
            <option value="+6">	(GMT+06:00) Sri Jayawardenepura</option>
            <option value="+6">	(GMT+06:00) Almaty, Novosibirsk</option>
            <option value="+6.5">	(GMT+06:30) Yangon Rangoon</option>
            <option value="+7">	(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
            <option value="+7">	(GMT+07:00) Krasnoyarsk</option>
            <option value="+8">	(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi</option>
            <option value="+8">	(GMT+08:00) Kuala Lumpur, Singapore</option>
            <option value="+8">	(GMT+08:00) Taipei</option>
            <option value="+8">	(GMT+08:00) Perth</option>
            <option value="+8">	(GMT+08:00) Irkutsk, Ulaanbaatar</option>
            <option value="+9">	(GMT+09:00) Seoul</option>
            <option value="+9">	(GMT+09:00) Osaka, Sapporo, Tokyo</option>
            <option value="+9">	(GMT+09:00) Yakutsk</option>
            <option value="+9.5">	(GMT+09:30) Darwin</option>
            <option value="+9.5">	(GMT+09:30) Adelaide</option>
            <option value="+10">	(GMT+10:00) Canberra, Melbourne, Sydney</option>
            <option value="+10">	(GMT+10:00) Brisbane</option>
            <option value="+10">	(GMT+10:00) Hobart</option>
            <option value="+10">	(GMT+10:00) Vladivostok</option>
            <option value="+10">	(GMT+10:00) Guam, Port Moresby</option>
            <option value="+11">	(GMT+11:00) Magadan, Solomon Islands, New Caledonia</option>
            <option value="+12">(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands</option>
            <option value="+12">	(GMT+12:00) Auckland, Wellington</option>
            <option value="+13">	(GMT+13:00) Nuku'alofa</option>
          </select>
        </div>
        <div className="date">
          {this.state.month}. {this.state.date} - {this.state.day}
        </div>
        <div className="display">
          {this.state.hr} : {this.state.min} : {this.state.sec} {this.state.ampm}
        </div>
      </div>
    );
  }
};
