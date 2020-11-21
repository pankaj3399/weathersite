const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_value = document.getElementById('temp_real_value');
const temp_status = document.getElementById('temp_status');

const dataHide = document.querySelector('.middle_layer');
const getInfo = async (e) => {
	e.preventDefault();
	let cityVal = cityName.value;
	if (cityVal === '') {
		dataHide.classList.add('data_hide');
		city_name.innerText = 'Write a proper city name to search ';
		dataHide.classList.add('data_hide');
	} else {
		let url = `api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e568d7d5cac4bb3ac85f355b7b989fd5`;
		//console.log(url);
		const response = await fetch(
			`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e568d7d5cac4bb3ac85f355b7b989fd5`,
			{
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			}
		);

		const data = await response.json();

		city_name.innerText = `${data.name} ${data.sys.country}`;
		temp_real_value.innerText = data.main.temp;

		const tempMod = data.weather[0].main;

		if (tempMod === 'Clear') {
			temp_status.innerHTML = "<i class= 'fas fa-sun' style='color:#eccc68'></i>";
		} else if (tempMod === 'Clouds') {
			temp_status.innerHTML = "<i class= 'fas fa-cloud' style='color:#f1f2f6'></i>";
		} else if (tempMod === 'Rain') {
			temp_status.innerHTML = "<i class= 'fas fa-cloud-rain' style='color:#a4b0be'></i>";
		} else {
			temp_status.innerHTML = "<i class= 'fas fa-sun' style='color:#eccc68'></i>";
		}
		dataHide.classList.remove('data_hide');
	}
};

submitBtn.addEventListener('click', getInfo);
