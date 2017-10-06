
		Vue.component('phones', {
			template: `	<section class="search-results">
							<phones-header></phones-header>
							<phones-items></phones-items>
						</section>`
		});
		
		Vue.component('phones-header', {
			template: `	<header class="search-results-header">
							<div class="search-results-item search-results-choose"></div>
							<div class="search-results-item search-results-sender" style="left: 25px;">ФИО</div>
							<div class="search-results-item search-results-product">Телефон</div>
							<div class="search-results-item search-results-sender" style="left: 25px;">Улица</div>
							<div class="search-results-item search-results-transfer" style="left: -15px;">Дом</div>
							<div class="search-results-item search-results-amount" style="left: -25px;">Квартира</div>
 
							<div class="search-results-item search-results-result">Индекс</div>
 
						</header>`

		});
		
		Vue.component('phones-items', {
			template: `	<div class="search-results-content">
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
				searchQuery: ''
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
					appConfig.message = 'Loading...'
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