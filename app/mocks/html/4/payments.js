
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
								<div class="search-results-item search-results-choose"><span class="circle"></span></div>
								<div class="search-results-item search-results-sender">{{ item.status }}</div>
								<div class="search-results-item search-results-product">Приватний</div>
								<div class="search-results-item search-results-transfer">2155684289524</div>
								<div class="search-results-item search-results-currency">UAH</div>
								<div class="search-results-item search-results-amount">2568.00</div>
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
				items: []
			  }
			},
			created() {
				this.fetchData();
			},
			methods: {
				fetchData() {
					appConfig.message = 'Loading...'
					this.$http.post('http://10.18.10.8:3000/payment/listall', {                
							id: 'id'})
						.then(result => { 
							//console.log(result);
							this.items = result.data;
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