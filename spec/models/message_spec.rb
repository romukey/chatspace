# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  body          :text(65535)
#  chat_group_id :integer
#  user_id       :integer
#  image         :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Message do
  describe '#Create' do
    let(:message) { build(:message) }

    context 'When a message can be saved' do
      it 'is valid with all attributes(body, image, user_id, group_id) contained' do
        expect(message).to be_valid
      end

      it 'is valid with a message' do
        message.body = Faker::Pokemon.name # just for fun
        expect(message).to be_valid
      end

      it 'is valid with an image included' do
        message.image = Faker::Company.logo
        expect(message).to be_valid
      end

      it 'is valid with both a message and an image included' do
        message.image = Faker::Company.logo
        message.body = Faker::Pokemon.name # just for fun
        expect(message).to be_valid
      end
    end

    context 'When a message cannot be saved' do
      it 'is invalid without both a body message and an image' do
        message.body = nil
        message.image = nil
        save_result = message.valid?
        expect(save_result).to be false
      end

      it 'is invalid without a group_id' do
        message.chat_group_id = nil
        save_result = message.invalid?
        expect(save_result).to be false
      end

      it 'is invalid without a user_id' do
        message.user_id = nil
        save_result = message.invalid?
        expect(save_result).to be false
      end
    end
  end
end
