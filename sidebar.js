(function() {
    var Menubar = function() {
        this.el = document.querySelector('#sidebar ul');
        this.state = 'allClosed';
        this.el.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        var self = this;
        this.currentOpenMenuContent = null;
        this.menuList = document.querySelectorAll('#sidebar ul > li');
        for (var i = 0; i < this.menuList.length; i++) {
            this.menuList[i].addEventListener('click', function (e) {
                var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
                if (self.state === 'allClosed') {
                    // console.log('打开' + menuContentEl.id);
                    menuContentEl.style.top = '0';
                    menuContentEl.style.left = '-165px';
                    menuContentEl.className = 'nav-content';
                    menuContentEl.classList.add('menuContent-move-right');
                    self.state = 'hasOpened';
                    self.currentOpenMenuContent = menuContentEl;
                }else {
                    // console.log('关闭' + self.currentOpenMenuContent.id);
                    self.currentOpenMenuContent.className = 'nav-content';
                    self.currentOpenMenuContent.style.top = '0';
                    self.currentOpenMenuContent.style.left = '35px';
                    self.currentOpenMenuContent.classList.add('menuContent-move-left');
                    // console.log('打开' + menuContentEl.id);
                    menuContentEl.className = 'nav-content';
                    menuContentEl.style.top = '250px';
                    menuContentEl.style.left = '35px';
                    menuContentEl.classList.add('menuContent-move-up');
                    self.state = 'hasOpened';
                    self.currentOpenMenuContent = menuContentEl;
                }
            });
        }
        this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
        for (i = 0; i < this.menuContentList.length; i++) {
            this.menuContentList[i].addEventListener('click', function (e) {
                var menuContent = e.currentTarget.parentNode;
                menuContent.className = 'nav-content';
                menuContent.style.top = '0';
                menuContent.style.left = '35px';
                menuContent.classList.add('menuContent-move-left');
                this.state = 'allClosed';
            });
        }
    };

    var Sidebar = function() {
        this.state = 'opened';
        this.el = document.getElementById('sidebar');
        this.closeBarEl = document.getElementById('closeBar');
        var self = this;
        this.menubar = new Menubar();
        this.el.addEventListener('click', function(event) {
            if (event.target !== self.el) {
                self.triggerSwitch();
            }
        });
    };
    Sidebar.prototype.close = function() {
        // console.log('关闭sidebar');
        this.el.style.left = '0';
        this.el.className = 'sidebar-move-left';
        this.closeBarEl.style.left = '0';
        this.closeBarEl.className = 'closeBar-move-right';
        this.state = 'closed';
    };
    Sidebar.prototype.open = function() {
        // console.log('打开sidebar');
        this.el.style.left = '-35px';
        this.el.className = 'sidebar-move-right';
        this.closeBarEl.style.left = '85px';
        this.closeBarEl.className = 'closeBar-move-left';
        this.state = 'opened';
    };
    Sidebar.prototype.triggerSwitch = function() {
        if (this.state === 'opened') {
            this.close();
        }else {
            this.open();
        }
    };
    var sidebar = new Sidebar();
})();