class Api::HoldingsController < ApplicationController
    def create
        if params[:holding][:buying_power].to_f >= 0
            @user_records = Holding.where(user_id: params[:holding][:user_id])
            @update_record = @user_records.find_by(ticker: params[:holding][:ticker])
            if @update_record
                new_amt = @update_record.quantity + params[:holding][:quantity].to_i
                if new_amt >= 0
                    @update_record.update(quantity: new_amt)
                    @holding = @update_record
                    render :show
                elsif new_amt == 0
                    @update_record.destroy
                else
                    render json: ["not enough shares"], status: 422
                end
            else
                @holding = Holding.new(holdings_params)
                if @holding.quantity >= 0
                    @holding.save
                    render :show
                else
                    render json: ["not enough shares"], status: 422
                end
            end
        end
    end

    def index
        @holdings = Holding.where(user_id: params[:holding][:user_id].to_i)
        if @holdings
            render :index
        else
            render json: ['no user holdings yet']
        end
    end

    def show
        @holdings = Holding.where(user_id: params[:holding][:user_id].to_i)
        @holding = @holdings.find_by(ticker: params[:holding][:ticker])
        if @holding
            render :show
        else
            render json: ['no holding to fetch']
        end
    end

    private
    def holdings_params
        params.require(:holding).permit(:user_id, :ticker, :quantity)
    end
end
