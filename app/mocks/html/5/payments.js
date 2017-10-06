
		Vue.component('payments', {
			template: `	<section class="search-results">
							<payments-header></payments-header>
							<payments-items></payments-items>
						</section>`
		});
		
		Vue.component('payments-header', {
			template: `	<header class="search-results-header">
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
						</header>`

		});
		
		Vue.component('payments-items', {
			template: `	<div class="search-results-content">
							<div class="payment" v-for="item in items">
								<div class="search-results-item search-results-choose"><span class="circle">{{ searchQuery }}</span></div>
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
				searchQuery: ''
			  }
			},
			created() {
				this.fetchData();
				bus.$on('searchQuery', searchQuery => {
					this.searchQuery = searchQuery;
					var arr = [].concat(this.filteredItems);
					var items = arr.filter((el) => el.cashdesk_system_id.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
					this.items = items;
				})
			},
			methods: {
				fetchData() {
					appConfig.message = 'Loading...';
					this.$http.post('http://10.18.10.8:3000/payment/listall', {                
							id: 'id'})
						.then(result => {
							this.items = result.data;
							this.filteredItems = result.data;
						})
				},
				onChangeText(e) {
					var text = appConfig.searchQuery;
					var arr = [].concat(this.state.filteredItems);
					var items = arr.filter((el) => el.cashdesk_system_id.toLowerCase().indexOf(text.toLowerCase()) != -1);
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