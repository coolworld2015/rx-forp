
		Vue.component('users', {
			template: `	<div class="wrapper">

							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<users-header></users-header>
										<users-items></users-items>
									</section>
									
									<users-footer></users-footer>
								</main>
							</div>

						</div>`,
			data: function () {
			  return {
				route: 'Users',		
			  }
			},
			created() {
				appConfig.route = this.route;			
			},			
		});
		
		Vue.component('users-header', {
			template: `	<header class="header d-flex justify-content-center align-items-center">
		
							<form action="/" class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
								<input type="text" class="form-control" placeholder="Пошук платежу" 
								v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
								<svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
								<span class="hot-key-hint hot-key-hint--left">/</span>
							</form>
							
							<div class="search-results-header">							
								<div class="search-results-item search-results-choose"></div>
								<div class="search-results-item search-results-sender">Відправник</div>
								<div class="search-results-item search-results-product">Продукт</div>
								<div class="search-results-item search-results-transfer">Номер переказу</div>
								<div class="search-results-item search-results-currency">Валюта</div>
								<div class="search-results-item search-results-amount">Сума</div>
								<div class="search-results-item search-results-date">Дата</div>
								<div class="search-results-item search-results-result">Дійсний</div>
								<div class="search-results-item search-results-status">Статус</div>
								<div class="search-results-item search-results-other"></div>
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
				}
			}			
		});
		
		Vue.component('users-footer', {
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
		
		Vue.component('user-form', {
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
								<input type="text" class="form-control" id="senderPhone" placeholder="+380 (XX) XXX-XX-XX" v-model="amount">
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
									<option>{{ amount }}</option>
								</select>
								<div class="invalid-feedback">
									Будь ласка, виберіть зі списку тип документу.
								</div>
							</div>
		
							<div class="form-row">
								<div class="form-group col-md-3">
									<label for="idSeries">Серія</label>
									<input type="text" class="form-control" id="idSeries" placeholder="-" v-model="amount">
									<div class="invalid-feedback">
										Будь ласка, коректно вкажіть серію документу.
									</div>
								</div>
								<div class="form-group col-md-9">
									<label for="numberId">Номер</label>
									<input type="text" class="form-control" id="numberId" placeholder="-" v-model="amount">
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
						name: '',
						amount: '',
					}
			},
			created() {
				if (!appConfig.user) {
					this.$router.push('/users');
				} else {
					this.setData();
				}
			},
			methods: {
				setData() {
					if (appConfig) {
						if (appConfig.user) {
							this.name = appConfig.user.name;
						}
					}
				},
				goBack() {
					this.$router.push('/users');
				},
				updateItem() {
					appConfig.message = 'Loading...'
					this.$http.post('https://ui-base.herokuapp.com/api/users/update', {                
							id: this.id,
							name: this.name,
							pass: this.pass,
							description: this.description})
						.then(result => { 
							this.$router.push('/users');
						})
				},
			}
		});	
						
		Vue.component('user-details', {
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<user-form></user-form>
									</section>
								</main>
							</div>
 
						</div>`
		});
		
		Vue.component('user-edit', {
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<user-form></user-form>
									</section>
								</main>
							</div>
 
						</div>`
		});
				
		Vue.component('users-items', {
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
							<div class="payment" v-for="item in items" v-bind:class="{ selected: clicked }" v-on:click="showDetails(item)">
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.name }}</div>
								<div class="search-results-item search-results-product">{{ item.name }}</div>
								<div class="search-results-item search-results-transfer">{{ item.id }}</div>
								<div class="search-results-item search-results-currency">UAH</div>
								<div class="search-results-item search-results-amount">1111</div>
								<div class="search-results-item search-results-date">01 Жовтня 2017</div>
								<div class="search-results-item search-results-result long-term">
									<span class="search-results-icon"></span>
									30 днів
								</div>
								<div class="search-results-item search-results-status active">
									<svg class="search-results-svg"><use xlink:href="#flag"></use></svg>
									Активний
								</div>
								<div class="search-results-item search-results-other">...</div>
							</div>
						</div>`,
			data: function () {
			  return {
				items: [],
				filteredItems: [],
				loading: true,
				clicked: false
			  }
			},
			created() {
				this.fetchData();
				bus.$on('searchQuery', searchQuery => {
					this.searchQuery = searchQuery;
					var arr = [].concat(this.filteredItems);
					var items = arr.filter((el) => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					this.items = items;
					bus.$emit('itemsCount', items.length);
					
					if (searchQuery == '') {
						this.items = this.filteredItems;
					}
				})
			},
			methods: {
				fetchData() {
					this.$http.get('https://ui-base.herokuapp.com/api/users/get')
						.then(result => {
							this.items = result.data.sort(this.sort);
							this.filteredItems = result.data.sort(this.sort);
							this.loading = false;
							bus.$emit('itemsCount', result.data.length);
						})
				},
				onItem(item) {
					if (this.clicked) {
						this.clicked = false;
					} else {
						this.clicked = true;
					}
					console.log(item.id);
					//this.clicked = true;
				},
				showItem(item){
					this.$router.push({ path: '/user-details/' + item.id + '/' + item.name + '/' + item.pass + '/' + item.description });
				},				
				showDetails(item){
					appConfig.user = item;
					console.log(appConfig.user);
					this.$router.push('user-edit');
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