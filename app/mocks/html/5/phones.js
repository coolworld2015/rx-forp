
		Vue.component('phones', {
			template: `	<div class="wrapper">
 
							<navbar></navbar>
							<div class="content">
								<main>
									<section class="search-results">
										<phones-header></phones-header>
										<phones-items></phones-items>
									</section>
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
							<div class="payment" v-for="item in items">
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
					this.items = items;
					
					if (searchQuery == '') {
						this.items = this.filteredItems;
					}
				})				
			},
			methods: {
				fetchData() {
					this.$http.get('https://ui-base.herokuapp.com/api/items/get')
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