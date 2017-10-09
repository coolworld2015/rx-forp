
		Vue.component('payments', {
			template: `	<div class="wrapper">

							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<payments-header></payments-header>
										<payments-items></payments-items>
									</section>
									
									<section class="activated-payments d-flex justify-content-start align-items-center shown" id="activatedPayments">
										<div class="activated-payments-item">
											<span class="selected-payments" id="activatedPaymentsBox">0</span>
											Платежів вибрано
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
									</section>
									
								</main>
							</div>

						</div>`,
			data: function () {
			  return {
				route: 'Payments',		
			  }
			},
			created() {
				appConfig.route = this.route;			
			},			
		});
		
		Vue.component('payments-header', {
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
				},
				changeRoute(route) {
					event.preventDefault()
					this.$router.push({ path: route});
					return false;
				}
			}			
		});
		
		Vue.component('payments-items', {
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
							<div class="payment" v-for="item in items">
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.cashdesk_system_id }}</div>
								<div class="search-results-item search-results-product">{{ item.sender.cashdesk.city_id }}</div>
								<div class="search-results-item search-results-transfer">{{ item.cashdesk_registration_id }}</div>
								<div class="search-results-item search-results-currency">UAH</div>
								<div class="search-results-item search-results-amount">{{((+item.amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</div>
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
					var items = arr.filter((el) => el.cashdesk_system_id.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					//var items = arr.filter((el) => el.id.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					this.items = items;
					
					if (searchQuery == '') {
						this.items = this.filteredItems;
					}
				})
			},
			methods: {
				fetchData() {
					this.$http.post('http://10.18.10.8:3000/payment/listall', {id: 'id'})
					//this.$http.get('https://ui-base.herokuapp.com/api/users/get')
						.then(result => {
							this.items = result.data;
							this.filteredItems = result.data;
							this.loading = false;
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
				onChangeText(e) {
					var text = appConfig.searchQuery;
					var arr = [].concat(this.state.filteredItems);
					//var items = arr.filter((el) => el.cashdesk_system_id.toLowerCase().indexOf(text.toLowerCase()) != -1);
					this.items = items;
				},
				showItem(item){
					this.$router.push({ path: '/user-item/' + item.id + '/' + item.name + '/' + item.pass + '/' + item.description });
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
		/*
						<div class="search-results-content" v-else>
							<div class="payment" v-for="item in items">
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.cashdesk_system_id }}</div>
								<div class="search-results-item search-results-product">{{ item.sender.cashdesk.city_id }}</div>
								<div class="search-results-item search-results-transfer">{{ item.cashdesk_registration_id }}</div>
								<div class="search-results-item search-results-currency">UAH</div>
								<div class="search-results-item search-results-amount">{{((+item.amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</div>
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
		*/
		/*				
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
							<div class="payment" v-for="item in items" v-bind:class="{ selected: clicked }" v-on:click="onItem(item)">
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.id }}</div>
								<div class="search-results-item search-results-product">{{ item.id }}</div>
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
		*/					