		Vue.component('navbar', {
			template: ` <aside class="navigation-sidebar" v-bind:class="{ shown: isActive }">
							<nav class="h-100 fp-navbar" onclick="event.preventDefault();return false">
							
								<ul class="h-100 fp-nav-right">
									<li class="fp-nav-item fp-nav-item-right fp-nav-close li-border-bottom" v-on:click="changeView()">
										<a class="fp-nav-link" href="#" id="hideNav">&#x2715</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right">
										<a class="fp-nav-link menu-block-header" href="#">Платежі</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right active" v-on:click="changeRoute('payments')">
										<a class="fp-nav-link" href="#">Миттєвий</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('phones')">
										<a class="fp-nav-link" href="#">Експрес</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right">
										<a class="fp-nav-link" href="#">Безготівковий</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right">
										<a class="fp-nav-link" href="#">Безготівковий+</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right hovered">
										<a class="fp-nav-link" href="#">Cash2Card</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right li-border-bottom">
										<a class="fp-nav-link" href="#">Інтернет еквайринг</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right">
										<a class="fp-nav-link menu-block-header" href="#">Реєстр операцій</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right">
										<a class="fp-nav-link" href="#">Реєстр операцій</a>
									</li>
									<li class="fp-nav-item fp-nav-item-right li-border-bottom">
										<a class="fp-nav-link" href="#">Касова книга</a>
									</li>
								</ul>
								<ul class="h-100 fp-nav-left">
									<li class="fp-nav-item fp-nav-item-left li-border-bottom" v-on:click="changeView()">
										<a class="fp-nav-link" href="#" id="showNav">FP</a>
										<span class="hot-key-hint">~</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left">
										<a class="fp-nav-link" href="#"></a>
										<span class="hot-key-hint">1</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left active" v-on:click="changeRoute('payments')">
										<a class="fp-nav-link" href="#">М</a>
										<span class="hot-key-hint">2</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('phones')">
										<a class="fp-nav-link" href="#">Е</a>
									</li>
									<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('test')">
										<a class="fp-nav-link" href="#">Б</a>
										<span class="hot-key-hint">4</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left">
										<a class="fp-nav-link" href="#">Б+</a>
										<span class="hot-key-hint">5</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left hovered">
										<a class="fp-nav-link" href="#">2</a>
										<span class="hot-key-hint">6</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left li-border-bottom">
										<a class="fp-nav-link" href="#">І</a>
										<span class="hot-key-hint">7</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left">
										<img src="">
									</li>
									<li class="fp-nav-item fp-nav-item-left">
										<a class="fp-nav-link" href="#">РО</a>
										<span class="hot-key-hint">8</span>
									</li>
									<li class="fp-nav-item fp-nav-item-left li-border-bottom" v-on:click="changeView()">
										<a class="fp-nav-link" href="#">КК</a>
										<span class="hot-key-hint">9</span>
									</li>
								</ul>
							</nav>
						</aside>`,
		
			data: function () {
			  return {
				searchQuery: '',
				route: appConfig.route,
				isActive: false
			  }
			},
			created() {
				console.log('appConfig ' + appConfig.route)
			},	
			methods: {
				changeView() {
					console.log(this.route)
					
					if (this.isActive !== false) {
						this.isActive = false;
					}
					else {
						this.isActive = true;
					}

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