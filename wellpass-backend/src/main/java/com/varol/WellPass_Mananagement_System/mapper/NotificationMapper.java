package com.varol.WellPass_Mananagement_System.mapper;

import com.varol.WellPass_Mananagement_System.dtos.response.notification.NotificationResponse;
import com.varol.WellPass_Mananagement_System.model.notification.Notification;

public class NotificationMapper {

    public static NotificationResponse toResponse(Notification notification) {
        if (notification == null) {
            return null;
        }

        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setType(notification.getType());
        response.setIsRead(notification.getIsRead());
        response.setReadAt(notification.getReadAt());
        response.setCreatedAt(notification.getCreatedAt());

        return response;
    }
}