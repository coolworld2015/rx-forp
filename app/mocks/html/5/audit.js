
		Vue.component('audit', {
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<audit-header></audit-header>
										<audit-items></audit-items>
									</section>
									
									<audit-footer></audit-footer>
								</main>
							</div>
 
						</div>`,
			data: function () {
			  return {
				route: 'Audit',		
			  }
			},
			created() {
				appConfig.route = this.route;			
			},
		});
		
		Vue.component('audit-header', {
			template: `	<header class="header d-flex justify-content-center align-items-center">

							<form action="/" class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
								<input type="text" class="form-control" placeholder="Поиск пользователя" 
								v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
								<svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
								<span class="hot-key-hint hot-key-hint--left">/</span>
							</form>
				
							<div class="search-results-header">
								<div class="search-results-item search-results-choose"></div>
								<div class="search-results-item search-results-sender" style="left: 25px;">ID</div>
								<div class="search-results-item search-results-product">Пользователь</div>
								<div class="search-results-item search-results-sender" style="left: 25px;">Дата</div>
								<div class="search-results-item search-results-transfer" style="left: -15px;">Описание</div>
								<div class="search-results-item search-results-amount" style="left: -25px;">Адрес</div>
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
		
		Vue.component('audit-footer', {
			template: `	<section class="activated-payments d-flex justify-content-start align-items-center shown" id="activatedPayments">
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
						</section>`,
			data: function () {
			  return {
				route: 'Payments',		
			  }
			},
			created() {
				appConfig.route = this.route;			
			},			
		});
		
		Vue.component('audit-items', {
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
								<div class="search-results-item search-results-sender">{{ item.id }}</div>
								<div class="search-results-item search-results-transfer">{{ item.name }}</div>
								<div class="search-results-item search-results-sender">{{ item.date }}</div>
								<div class="search-results-item search-results-transfer">{{ item.description }}</div>
								<div class="search-results-item search-results-amount">{{ item.id }}</div>
 
								<div class="search-results-item search-results-result long-term">
									<span class="search-results-icon"></span>
									{{ item.ip }}
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
					var items = arr.filter((el) => el.id.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					this.items = items;
					
					if (searchQuery == '') {
						this.items = this.filteredItems;
					}
				})				
			},
			methods: {
				fetchData() {
					this.$http.get('https://ui-base.herokuapp.com/api/audit/get')
						.then(result => { 
							//console.log(result);
							this.items = result.data.sort(this.sort).slice(0, 150);
							this.filteredItems = result.data.sort(this.sort).slice(0, 150);
							this.loading = false;
						})
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