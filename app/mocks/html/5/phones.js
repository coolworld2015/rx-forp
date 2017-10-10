
		Vue.component('phones', {
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<phones-header></phones-header>
										<phones-items></phones-items>
									</section>
									
									<phones-footer></phones-footer>
								</main>
							</div>
 
						</div>`,
			data: function () {
			  return {
				route: 'Phones',		
			  }
			},
			created() {
				appConfig.route = this.route;			
			},
		});
		
		Vue.component('phones-header', {
			template: `	<header class="header d-flex justify-content-center align-items-center">

							<form action="/" class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
								<input type="text" class="form-control" placeholder="Поиск абонента" 
								v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
								<svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
								<span class="hot-key-hint hot-key-hint--left">/</span>
							</form>
				
							<div class="search-results-header">
								<div class="search-results-item search-results-choose"></div>
								<div class="search-results-item search-results-sender" style="left: 25px;">ФИО</div>
								<div class="search-results-item search-results-product">Телефон</div>
								<div class="search-results-item search-results-sender" style="left: 25px;">Улица</div>
								<div class="search-results-item search-results-transfer" style="left: -15px;">Дом</div>
								<div class="search-results-item search-results-amount" style="left: -25px;">Квартира</div>
								<div class="search-results-item search-results-result">Индекс</div>
							</div>
						</header>`,
			data: function () {
			  return {
				searchQuery: ''
			  }
			},
			methods: {
				changeView() {
					bus.$emit('searchQuery', this.searchQuery);
				},
				searchClear() {
					this.searchQuery = '';
					bus.$emit('searchQuery', this.searchQuery);
				},
				changeRoute(route) {
					event.preventDefault()
					this.$router.push({ path: route});
					return false;
				}
			}			
		});
		
		Vue.component('phones-footer', {
			template: `	<section class="activated-payments d-flex justify-content-start align-items-center shown" id="activatedPayments">
							<div class="activated-payments-item">
								<span class="selected-payments" id="activatedPaymentsBox" style="width: 44px;">{{ count }}</span>
								Платежів
							</div>
							<div class="activated-payments-item">
								<button class="" id="cancelSelection">
									<svg class="activated-payments-svg"><use xlink:href="#cancel"></use></svg>
									Відмінити
								</button>
							</div>
							<div class="activated-payments-item">
								<button id="showTrusted">
								<svg class="activated-payments-svg"><use xlink:href="#flag"></use></svg>
								Відмінити довірені
								<svg class="activated-payments-svg activated-payments-svg--end"><use xlink:href="#triangle"></use></svg>
								</button>
							</div>
							<div class="activated-payments-item">
								<button id="showTrusted">
								<svg class="activated-payments-svg"><use xlink:href="#graph"></use></svg>
								Згенерувати звіт
								<svg class="activated-payments-svg activated-payments-svg--end"><use xlink:href="#triangle"></use></svg>
								</button>
							</div>
							<div class="search-results-item">
								<span class="hint">click</span>
								Виділити
								<span class="hint">esc</span>
								Зняти виділення
							</div> 
						</section>`,
			data: function () {
			  return {
				count: 0,		
			  }
			},
			created() {
				bus.$on('itemsCount', itemsCount => {
					this.count = itemsCount;
				})			
			},				
		});
				
		Vue.component('phone-form', {
			template: `<form action="/" class="payment-form payment-form--create d-flex justify-content-stretch">
					
					<fieldset class="sender-data form-section-wrapper">
						<legend>Відправник</legend>
						
						<div class="form-section">
							<div class="form-group">
								<label for="senderSurname">Прізвище</label>
								<input type="text" class="form-control" id="senderSurname" placeholder="Прізвище відправника" v-model="name">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть прізвище відправника.
								</div>
							</div>
							<div class="form-group">
								<label for="senderName">Ім'я</label>
								<input type="text" class="form-control" id="senderName" placeholder="Ім'я відправника" v-model="name">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть ім'я відправника.
								</div>
							</div>
							<div class="form-group">
								<label for="senderPatronymic">По-батькові</label>
								<input type="text" class="form-control" id="senderPatronymic" placeholder="По-батькові відправника" v-model="name">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть по-батькові відправника.
								</div>
							</div>
							<div class="form-group">
								<label for="senderPhone">Номер телефону</label>
								<input type="text" class="form-control" id="senderPhone" placeholder="+380 (XX) XXX-XX-XX" v-model="phone">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть номер телефону відправника.
								</div>
							</div>
							<div class="form-group input-disabled">
								<label for="senderBirthday">Дата народження</label>
								<input type="text" class="form-control" id="senderBirthday" placeholder="ДД.ММ.РРРР" disabled>
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть дату народження відправника.
								</div>
							</div>
							<div class="form-group input-disabled">
								<label for="senderBirthPlace">Місце народження</label>
								<input type="text" class="form-control" id="senderBirthPlace" placeholder="Місто народження, країна" disabled>
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть місце народження відправника.
								</div>
							</div>
							<div class="form-group input-disabled">
								<label for="taxId">ІПН</label>
								<input type="text" class="form-control" id="taxId" placeholder="Ідентифікаційний номер" disabled>
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть індивідуальний податковий номер відправника.
								</div>
							</div>
						</div>

						<div class="form-section">
							<div class="form-group">
								<label for="typeId">Тип документу</label>
								<select class="form-control" id="typeId">
									<option>{{ street }}</option>
								</select>
								<div class="invalid-feedback">
									Будь ласка, виберіть зі списку тип документу.
								</div>
							</div>
		
							<div class="form-row">
								<div class="form-group col-md-3">
									<label for="idSeries">Серія</label>
									<input type="text" class="form-control" id="idSeries" placeholder="-" v-model="house">
									<div class="invalid-feedback">
										Будь ласка, коректно вкажіть серію документу.
									</div>
								</div>
								<div class="form-group col-md-9">
									<label for="numberId">Номер</label>
									<input type="text" class="form-control" id="numberId" placeholder="-" v-model="apt">
									<div class="invalid-feedback">
										Будь ласка, коректно вкажіть номер документу.
									</div>
								</div>
							</div>
							
							<div class="form-group">
								<label for="issueOrganization">Орган видачі</label>
								<textarea class="form-control" row="3" id="issueOrganization" placeholder="Організація, що видала документ"></textarea>	
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть організацію, що видала документ.
								</div>
							</div>

							<div class="form-group">
								<label for="issueDate">Дата видачі</label>
								<input type="text" class="form-control" id="issueDate" placeholder="ДД.ММ.РРРР">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть дату видачі документу.
								</div>
							</div>

						</div>
					</fieldset>
					
					<fieldset class="receiver-data">
						<legend>Отримувач</legend>
						<div class="form-section">
							<div class="form-group">
								<label for="receiverSurname">Прізвище</label>
								<input type="text" class="form-control" id="receiverSurname" placeholder="Прізвище отримувача">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть прізвище отримувача.
								</div>
							</div>
							<div class="form-group">
								<label for="receiverName">Ім'я</label>
								<input type="text" class="form-control" id="receiverName" placeholder="Ім'я отримувача">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть ім'я отримувача.
								</div>
							</div>
							<div class="form-group">
								<label for="receiverPatronymic">По-батькові</label>
								<input type="text" class="form-control" id="receiverPatronymic" placeholder="По-батькові отримувача">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть по-батькові отримувача.
								</div>
							</div>
							<div class="form-group">
								<label for="receiverPhone">Номер телефону</label>
								<input type="text" class="form-control" id="receiverPhone" placeholder="+380 (XX) XXX-XX-XX">
								<div class="invalid-feedback">
									Будь ласка, коректно вкажіть номер телефону отримувача.
								</div>
							</div>
						</div>
					</fieldset>

					<fieldset class="amount-data">
						<legend>Сума</legend>
						<div class="form-section">
							<div class="form-group">
								<label for="amount">Сума переказу, грн</label>
								<input type="number" class="form-control" id="amount" placeholder="0.00" v-model="amount">
								<div class="invalid-feedback">
									Сума переказу не може перевищувати 149 999.99 грн.
								</div>
							</div>
							<div class="form-group">
								<label for="fee">Комісія</label>
								<input type="text" class="form-control" id="fee" value="2%" disabled>
							</div>
							<div class="form-group">
								<label for="totalAmount">Загальна сума</label>
								<input type="text" class="form-control" id="totalAmount" disabled>
							</div>
							<div class="form-group">
								<label for="amountReceived">Гроші клієнта</label>
								<input type="number" class="form-control" id="amountReceived" placeholder="0.00">
								<div class="invalid-feedback">
									Сума не може бути меншою за загальну суму переказу!
								</div>
							</div>
							<div class="form-group">
								<label for="charge">Решта</label>
								<input type="text" class="form-control" id="charge" disabled>
							</div>
						</div>
					</fieldset>
					
					<div class="form-info">
						<p>Відправити платіж <span class="amount">{{((+amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</span> UAH</p>
						<button class="btn btn-danger" type="submit" v-on:click="goBack">Відправити</button>
					</div>
				</form>`,
			data: function () {
				return {
					amount: '',
					id: this.$route.params.id,
					name: this.$route.params.name,
					phone: this.$route.params.phone,
					street: this.$route.params.street,
					house: this.$route.params.house,
					apt: this.$route.params.apt,
					index: this.$route.params.index,
				}
			},
			methods: {
				goBack() {
					this.$router.push('/phones');
				},
				updateItem() {
					appConfig.message = 'Loading...'
					this.$http.post('https://ui-base.herokuapp.com/api/users/update', {                
							id: this.id,
							name: this.name,
							pass: this.pass,
							description: this.description})
						.then(result => { 
							//console.log(result);
							this.$router.push('/users');
						})
				},
			}
		});				
						
		Vue.component('phone-details', {
			template1: '<div style="text-align: center; margin-top: 100px;">' + 
							'{{ name }}<br><br>' + 
							'<input v-model="id" readonly><br>' +
							'<input v-model="name"><br>' +
							'<input v-model="phone"><br>' +
							'<input v-model="street"><br>' +
							'<input v-model="house"><br>' +
							'<input v-model="apt"><br>' +
							'<input v-model="index"><br><br>' +
						'<button v-on:click="goBack" style="display: initial;">Back</button>' +
						'<phone-form></phone-form>' +
						'</div>',
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<phone-form></phone-form>
									</section>
									
									 
								</main>
							</div>
 
						</div>`,			
			data: function () {
					return {
						message: '',
						id: this.$route.params.id,
						name: this.$route.params.name,
						phone: this.$route.params.phone,
						street: this.$route.params.street,
						house: this.$route.params.house,
						apt: this.$route.params.apt,
						index: this.$route.params.index
					}
			},
			created() {
				appConfig.message = this.name;
			},
			methods: {
				goBack() {
					this.$router.push('/phones');
				},
				updateItem() {
					appConfig.message = 'Loading...'
					this.$http.post('https://ui-base.herokuapp.com/api/users/update', {                
							id: this.id,
							name: this.name,
							pass: this.pass,
							description: this.description})
						.then(result => { 
							//console.log(result);
							this.$router.push('/users');
						})
				},
			}
		});
		
		Vue.component('phones-items', {
			template: ` <div v-if="loading">
						  <div class="fa fa-circle-o-notch fa-spin" 
							style="position: relative; 
								top: 200px; 
								-webkit-box-align:center;
								-webkit-box-pack:center;
								display:-webkit-box;
								font-size:54px">
							</div>
						</div>	
						
						<div class="search-results-content" v-else>
							<div class="payment" v-for="item in items" v-on:click="showItem(item)">
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.name }}</div>
								<div class="search-results-item search-results-transfer">{{ item.phone }}</div>
								<div class="search-results-item search-results-sender">{{ item.street }}</div>
								<div class="search-results-item search-results-transfer">{{ item.house }}</div>
								<div class="search-results-item search-results-amount">{{ item.apt }}</div>
 
								<div class="search-results-item search-results-result long-term">
									<span class="search-results-icon"></span>
									{{ item.index }}
								</div> 
 
							</div>
						</div>`,
			data: function () {
			  return {
				items: [],
				filteredItems: [],
				loading: true,		
			  }
			},
			created() {
				this.fetchData();
				bus.$on('searchQuery', searchQuery => {
					this.searchQuery = searchQuery;
					var arr = [].concat(this.filteredItems);
					var items = arr.filter((el) => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					this.items = items.slice(0, 50);
					bus.$emit('itemsCount', items.length);
					
					if (searchQuery == '') {
						this.items = this.filteredItems.slice(0, 50);
					}
				})				
			},
			methods: {
				fetchData() {
					this.$http.get('https://ui-base.herokuapp.com/api/items/get')
						.then(result => { 
							//console.log(result);
							this.items = result.data.sort(this.sort).slice(0, 50);
							this.filteredItems = result.data.sort(this.sort);
							this.loading = false;
							bus.$emit('itemsCount', result.data.length);
						})
				},
				showItem(item){
					this.$router.push({ path: '/phone-details/' + item.id + '/' + item.name + '/' + 
						item.phone + '/' + item.street + '/' + item.house + '/' + item.apt + '/' + item.index });
				},				
				showDetails(item){
					appConfig.user = item;
					this.$router.push('user-edit');
					console.log("hello");
				},
				sort(a, b) {
					let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
					if (nameA < nameB) {
						return -1
					}
					if (nameA > nameB) {
						return 1
					}
					return 0;
				}				
			}
		});