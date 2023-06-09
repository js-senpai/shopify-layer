import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOrdersDto } from './dto/get-orders.dto';
import * as appConfig from '../json/projects.json';
import axios from 'axios';
import ChangeOrderStatusDto from './dto/change-order-status.dto';
@Injectable()
export class AppService {
  async getOrders({
    accountId,
    limit = 25,
    ...data
  }: GetOrdersDto): Promise<any[]> {
    const [getProject] = appConfig.projects.filter(
      (item) => item.accountId === accountId,
    );
    if (!getProject) {
      throw new NotFoundException(
        `The project with accountId "${accountId}" not found`,
      );
    }
    const {
      data: { orders = [] },
    } = await axios.get(
      `https://${getProject.hostName}.myshopify.com/admin/api/2023-04/orders.json`,
      {
        headers: {
          'X-Shopify-Access-Token': getProject.token,
        },
        params: {
          limit,
          ...data,
        },
      },
    );
    return orders;
  }

  async changeStatus({
    status,
    accountId,
    orderId,
  }: ChangeOrderStatusDto): Promise<any> {
    const [getProject] = appConfig.projects.filter(
      (item) => item.accountId === accountId,
    );
    if (!getProject) {
      throw new NotFoundException(
        `The project with accountId "${accountId}" not found`,
      );
    }
    const {
      data: { order = {} },
    } = await axios.put(
      `https://${getProject.hostName}.myshopify.com/admin/api/2023-04/orders/${orderId}.json`,
      {
        order: {
          financial_status: status,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': getProject.token,
        },
      },
    );
    return order;
  }
}
