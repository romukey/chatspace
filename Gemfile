source 'https://rubygems.org'

# FUNDAMENTAL
gem 'rails', '5.1.3'
gem 'mysql2', '>= 0.3.13', '< 0.5'
gem 'rake', '11.3.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'puma'

# SASS
gem 'sass-rails', '~> 5.0'

# JAVASCRIPT
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'turbolinks'

# AUTHENTICATION
gem 'devise'

# HAML
gem 'haml'

# IMAGE UPLOAD
gem 'carrierwave'

# FONT-AWESOME
gem 'font-awesome-rails'

# DECORATOR
gem 'draper'

# JSON
gem 'active_model_serializers'

group :production do

  # DEPLOY
  gem 'unicorn'
end

# REACT
gem 'react-rails'
gem 'webpacker'

group :development, :test do
  # DEBUG
  gem 'pry-rails'
  gem 'pry-byebug'

  # ANNOTATE
  gem 'annotate'

  # RSPEC
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_girl_rails', '~> 4.4.1'
  gem 'faker'
  gem 'rails-controller-testing'

  # DEPLOY
  gem 'capistrano'
  gem 'capistrano-rbenv'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano3-unicorn'

  # N + 1 CHECKER
  gem 'bullet'

  # LISTEN
  gem 'listen'

  # HAML CONVERTOR
  gem 'erb2haml'

  # SEED DATA
  gem 'seedbank'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
